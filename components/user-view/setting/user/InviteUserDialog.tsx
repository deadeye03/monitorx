"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, MoreHorizontal, ExternalLink } from "lucide-react"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import { createInviteUsers } from "@/action/inviteUsers"
import { Role } from "@prisma/client"
import LoadingScreen from "@/components/ui/LoadingScreen"
import { useUserRole } from "@/context/UserRoleContexts"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
function InviteUserDialog({ open, setOpen, params }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, params: string }) {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const { workspaceId } = useUserRole();
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState<Role>(Role.user)
    const [isWait, setIsWait] = useState(false)
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        // Regular expression for basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(emailValue));
    };
    const inviteUsers = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsWait(true)
        const data = { email, name, role, params }
        const inviteUser = await createInviteUsers(data,workspaceId)
        if (inviteUser === 'true') {
            toast.success('User is invited')
        }
        else {
            toast.error(inviteUser)
        }
        setIsWait(false)
        setOpen(false)
    }
    return (
        <>
        {isWait &&<LoadingScreen/>}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle>Add user</DialogTitle>
                    </DialogHeader>
                    <Alert className="bg-blue-50 text-blue-800 border-blue-100">
                        <InfoIcon className="h-4 w-4" />
                        <AlertDescription>
                            You can invite a new user to your account by sending an invitation to their email address. Click "Invite more" to add multiple new users.
                        </AlertDescription>
                    </Alert>
                    <form className="w-full  py-4">
                        <div className="w-full flex gap-4">
                            <div className="flex-1 grid gap-2">
                                <Label htmlFor="email">
                                    E-mail <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    type="email"
                                    onChange={handleEmailChange}
                                    required
                                />
                                <p className={`text-sm ${isEmailValid ? "text-muted-foreground" : "text-red-500"}`}>
                                    {isEmailValid ? "You should provide a valid email." : "Please enter a valid email address."}
                                </p>
                            </div>
                            <div className="flex-1 grid gap-2">
                                <Label htmlFor="name">Name <span className="text-red-500">*</span> </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <p className="text-sm text-muted-foreground">You should provide a full name.<span className="text-red-500">*</span> </p>
                            </div>
                            <div className="flex-1 grid gap-2">
                                <Label htmlFor="role">Select role <span className="text-red-500">*</span> </Label>
                                <Select value={role}
                                    onValueChange={(value) => setRole(value as Role)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <SelectItem value="owner">Owner</SelectItem> */}
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="stackholder">Stack-holder</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground">You should provide a role.<span className="text-red-500">*</span> </p>
                            </div>

                        </div>
                        <Button variant="link" className="w-fit px-0 text-blue-600 font-normal">
                            + Invite more
                        </Button>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" onClick={(e) => inviteUsers(e)} disabled={email.length < 6 || name.length < 3 || !role || !isEmailValid} className="disabled:bg-gray-500 " >Add</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default InviteUserDialog
