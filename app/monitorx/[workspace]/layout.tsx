import FeaturNav from "@/components/user-view/FeaturNav";
import { UserRoleProvider } from "@/context/UserRoleContexts";
import React from "react";

export default function WorkSpaceLayout({ children,params }: { children: React.ReactNode,params:{workspace:string} }) {
    console.log("params is ", params)
    return (
        <>
            <FeaturNav param={params.workspace} />
            
            {children}
        </>
    )
}
