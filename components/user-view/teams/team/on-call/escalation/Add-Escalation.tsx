"use client"

import * as React from "react"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { addEscalationPolicies, isUniqueEscalation_name } from "@/action/escalation"
import { notification_type } from "@prisma/client"
import toast from "react-hot-toast"
import LoadingScreen from "@/components/ui/LoadingScreen"
import SearchOption from "./SearchOption"

type Escalation = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    teamId: string
}

type Rule = {
    condition: string
    action: notification_type
    minutes: number
    id: string
    search:string
}

export default function AddEscalation({ open, setOpen, teamId }: Escalation) {
    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [showError, setShowError] = React.useState(false)
    const [openRule, setOpenRule] = React.useState(false)
    const [rules, setRules] = React.useState<Rule[]>([])
    const [errorMsg, setErrorMsg] = React.useState(false)
    const [isUniqueName,setIsUniqueName]=React.useState(false)
    const [showSuggestion, setShowSuggestion] = React.useState(false)
    // State for individual rule
    const [condition, setCondition] = React.useState("acknowleged")
    const [action, setAction] = React.useState<notification_type | 'user'>("user")
    const [minutes, setMinutes] = React.useState(0)
    const [search, setSearch] = React.useState('')
    const [id,setId]=React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        if (!name) {
            setShowError(true)
            return
        }
        // Handle form submission
        // console.log('rules is ',rules)
        const result = await addEscalationPolicies(rules, name, teamId)
        if (result.success) {
            toast.success(result.message)
        }
        else {
            toast.error(result.message)
        }
        setOpen(false)
        setIsLoading(false)
    }

    const handleSaveRule = () => {
        if (id === "") {
            setErrorMsg(true)
            console.log('this is error in rule')
            return;
        }
        setErrorMsg(false)
        const newRule: Rule = { condition, action, minutes, id,search }
        setRules([...rules, newRule])
        resetRuleForm()
        setOpenRule(false)
    }

    const resetRuleForm = () => {
        setCondition("acknowleged")
        setAction("user")
        setMinutes(0)
        setSearch("")
    }

    const handleAddRuel = async() => {
        if (!name) {
            setShowError(true)
            return;
        }
        else{
            if (!isUniqueName) {
                const result=await isUniqueEscalation_name(teamId,name);
                if (result?.isAvillable) {
                    setShowError(true)
                    return ;
                }
                else{
                    setIsUniqueName(true);
                }
            }
        }
        setOpenRule(true)
    }

    return (
        <>
            {isLoading && <LoadingScreen />}
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogContent className="sm:max-w-[950px] p-6 top-4 translate-y-0 translate-x-[-50%] overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>Add escalation</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[calc(100vh-200px)] px-6 py-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name <span className="text-red-500">*</span> </Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            setShowError(false)
                                        }}
                                        className={showError ? "border-red-500" : "focus:border-2 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 focus:"}
                                    />
                                    {showError && (
                                        <p className="text-sm text-red-500">
                                            You should provide an Unique escalation name.
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        className="resize-none"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-500">Escalation rules <span className="text-red-500">*</span></p>
                                </div>
                                {rules.map((rule, index) => (
                                    <div key={index} className="p-2 border rounded flex flex-col gap-2">
                                        <div className="flex items-center gap-4">
                                            <span className="bg-[#deebff] text-[#72a1e6] px-6 rounded-sm block">IF</span>
                                            <span className="h-2 w-2 block rounded-full bg-[#deebff]"></span>
                                            <span className="">Alert is not acknowledged,</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="px-[9px] font-semibold">THEN</span>
                                            <span className="h-2 w-2 block rounded-full bg-[#deebff]"></span>
                                            <span className=""><span className="text-sm font-semibold">{rule.minutes === 0 ? 'immediately' : `${rule.minutes}m`} </span>
                                                {rule.action === 'user' ? (<>notify <span className="font-semibold">{rule.search}</span></>) :
                                                    rule.action === 'team' ? <>route to team <span className="font-semibold">{rule.search}</span></>
                                                        : rule.action === 'on_call' ? <>notify on call users in <span className="font-semibold">{rule.search}</span></> : rule.action === 'members' ? <>notify all members of <span className="font-semibold">{rule.search}</span></> : rule.action === 'admin' ? <>notify admins of <span className="font-semibold">{rule.search}</span></> : <>notify users of <span className="font-semibold">{rule.search}</span></>}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {openRule &&
                                    <div className="space-y-4 shadow-md ">
                                        <div className="p-2 flex gap-2 flex-1 text-sm">
                                            <p className="">if the alert is acknowledged/unAcknowledged</p>
                                            <div className="flex flex-col gap-2 flex-1">
                                                <Select value={condition} onValueChange={setCondition}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='acknowleged' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="acknowleged">Acknowleged</SelectItem>
                                                        {/* <SelectItem value="close">Close</SelectItem> */}
                                                    </SelectContent>
                                                </Select>
                                                <Select value={action} onValueChange={(value) => {setAction(value as notification_type);setSearch('');setShowSuggestion(false)}}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Notify Users' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="user">Notify User</SelectItem>
                                                        <SelectItem value="on_call">Notify on-call user(s) in schedule</SelectItem>
                                                        <SelectItem value="team">Route to team</SelectItem>
                                                        <SelectItem value="members">Notify all member of team</SelectItem>
                                                        <SelectItem value="admin">Notify admin(s) of team</SelectItem>
                                                        <SelectItem value="notify_users">Notify user(s) of team</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col gap-2 flex-1">
                                                <div className="flex gap-4">
                                                    <Input
                                                        min={0}
                                                        type="number"
                                                        className="w-2/4 border-2"
                                                        value={minutes}
                                                        onChange={(e) => setMinutes(Number(e.target.value))}
                                                    />
                                                    <p className="text-[12px] text-gray-400">minutes after creation,</p>
                                                </div>

                                                {/* search option box */}

                                                <div>
                                                    <SearchOption search={search} setSearch={setSearch} action={action} setShowError={setShowError} teamId={teamId} showSuggestion={showSuggestion} setShowSuggestion={setShowSuggestion} setId={setId} />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pb-2 pr-2">
                                            <Button className="bg-slate-200 text-gray-400" onClick={() => setOpenRule(false)}>Cancel</Button>
                                            <Button type="button" className="bg-slate-500 text-white text-[14px] py-0" onClick={() => handleSaveRule()}>Save</Button>
                                        </div>
                                        {errorMsg && <div className="text-red-500">Enter the {action} name in search </div>}
                                    </div>
                                }
                                <div className="space-y-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => handleAddRuel()}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add rule
                                    </Button>
                                </div>
                            </div>
                            <DialogFooter className="gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="disabled:bg-gray-200 disabled:text-white disabled:hover:bg-gray-200" disabled={!isUniqueName || rules.length===0} >
                                    Add
                                </Button>
                            </DialogFooter>
                        </form>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    )
}

