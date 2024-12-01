"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { Member } from "@/types/type";
import { useUserRole } from "@/context/UserRoleContexts";
import { findAllWorkspaceMember } from "@/action/workSpace";
import { inviteTeamMembers } from "@/action/team";
import toast from "react-hot-toast";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function AddMemberPop({
  open,
  setOpen,
  teamId
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  teamId: string;
}) {
  const [member, setMember] = React.useState("");
  const [showSuggestion, setShowSuggestion] = React.useState<Member[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<Member[]>(
    []
  );
  const [workspace_userId, setWorkspace_usrId] = React.useState('');
  const [isLoading,setIsLoading]=React.useState(false);
  const { workspaceId } = useUserRole();
  // console.log('teamId is',teamId);
  // Fetch all workspace members once
  React.useEffect(() => {
    const getAllMembers = async () => {
      try {
        const allMembers: Member[] = await findAllWorkspaceMember(workspaceId);
        console.log('allMembers is ', allMembers);
        setShowSuggestion(allMembers);
        setFilteredSuggestions(allMembers); // Initialize filtered with all members
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    getAllMembers();
  }, [workspaceId]);

  // Filter members when `member` changes
  React.useEffect(() => {
    const filtered = showSuggestion.filter((mem) =>
      mem.user.email.toLowerCase().includes(member.toLowerCase()) ||
      mem.user.name.toLowerCase().includes(member.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  }, [member, showSuggestion]);
  const addInviteMember = async () => {
    setIsLoading(true)
    if (!workspaceId) {
      toast.error('Workspace not found please try again')
      return;
    }

    const addMembers = await inviteTeamMembers(teamId, workspace_userId,workspaceId);
    if (addMembers === 'true') {
      toast.success('Member is added successfully')
    }
    else {
      toast.error(addMembers);
    }
    setIsLoading(false)
    setOpen(false)
  }

  return (
    <>
     {isLoading&& <LoadingScreen/>}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] p-6 top-4 translate-y-0 translate-x-[-50%]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add member</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            <div className="flex gap-3 rounded-md bg-[#EBF2FF] p-4 text-[#0052CC]">
              <Info className="h-5 w-5 shrink-0" />
              <p className="text-sm">
                Add anyone in your account to this team. If they aren&apos;t in your account you
                can add them{" "}
                <a href="#" className="text-[#0052CC] hover:underline">
                  here
                </a>
                .
              </p>
            </div>
            <Input
              placeholder="Search.."
              className="w-full border-gray-300 rounded-md px-3 py-2"
              value={member}
              onChange={(e) => setMember(e.target.value)}
            />
            {filteredSuggestions.length > 0 && (
              <div className="min-h-10 max-h-40 w-max border rounded-md  overflow-y-auto no-scrollbar">
                <ul>
                  {filteredSuggestions.map((suggestion) => (
                    <li key={suggestion.user.id} className="py-2 px-4 hover:bg-gray-300 hover:text-blue-400 cursor-pointer" onClick={() => { setMember(suggestion.user.email); setWorkspace_usrId(suggestion.id) }}>{suggestion.user.email}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-gray-600"
              >
                Cancel
              </Button>
              <Button className="bg-[#0052CC] hover:bg-[#0052CC]/90 text-white cursor-pointer disabled:bg-gray-500 " disabled={workspace_userId === ''} onClick={()=>addInviteMember()} >
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
