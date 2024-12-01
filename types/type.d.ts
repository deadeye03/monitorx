import { $Enums } from "@prisma/client";

export interface configData {
    id: string
    name: string,
    monitorType: string,
    is_active: boolean,
    authType: string,
    username: string,
    password: string,
    user: {
        email: string
    },
    team: {
        id: string,
        teamName: string
    }
    initialToken: string,
    refreshUrl: string,
    headerKey: string,
    headerValue: string,
    interval: string,
    failuresCount: string,
    successCount: string,
    successResponseCount: string,
    endPointUrl: string,
    altNames: string,
    is_wildCard: boolean,
    wildcard_url: string,
    certificate_issue: Date,
    certificate_tenure: Date,
    daysBeforeExpiry: string,
    reminderFrequency: string,
    createdAt: Date,

}

export interface TeamsData {

    id: string;
    creatorId: string;
    workspaceId: string;
    teamName: string;
    description: string | null;
    createdAt: Date;

}

interface Member {
    id: string,
    user: {
        id: string;
        supaId: string;
        name: string;
        email: string;
        number: string | null; // Allow null
        photo: string | null;  // Allow null
    };
}
interface AllMembers {
    id: string,
    teamId: string,
    workspace_userId: string,
    workspace_user: {
        id: string,
        role: string,
        user: {
            email: string,
            name: string
        }
    }
}

interface TeamMembers {
    team: {
        id: string;
        teamName: string;
    };
}

interface Alerts {
    workspaceId: string;
    id: string;
    acknowledged: boolean;
    monitor_configId: string;
    userId: string | null;
    createdAt: Date;
    user: {
        id: string;
        email: string;
    } | null;
    monitor_config: {
        id: string;
        name: string | null;
        teamId: string | null;
    }

}

interface AlertsUser {

    id: string,
    email: string

}[]

interface Monitor {

    id: string
    name: string | null,
    monitorType: string,
    is_active: boolean,
    userId: string | null,
    workspaceId: string | null,
    teamId: string | null
    Monitor_HTTP_gPRC_config: {
        authType: string;
        password: string | null;
        id: string;
        monitor_configId: string;
        interval_check: string | null;
        userName: string | null;
        inital_token: string | null;
        refresh_token: string | null;
        header_key: string | null;
        header_value: string | null;
        endpoint_url: string | null;
        failure_count: string | null;
        success_count: string | null;
        success_response_code: string | null;
    },
    Monitor_SSL_config: {
        id: string
        monitor_configId: string | null
        endpoint_url: string | null;
        alt_names: string | null;
        is_wildcard: boolean;
        wildcard_url: string | null;
        certifcate_issue: string | null;
        certificate_tenure: string | null;
        expiry_reminder: string | null;
    }


}

interface EditMonitorData {

    name: string,
    type: string,
    authType: string,
    username: string,
    password: string,
    initialToken: string,
    refreshUrl: string,
    headerKey: string,
    headerValue: string,
    interval: string,
    failuresCount: string,
    successCount: string,
    successResponseCount: string,
    endPointUrl: string,
    altNames: string,
    daysBeforeExpiry: string,
    reminderFrequency: string,
    isWildCard: boolean,
    wildCardUrl: string,
    issueDate: string,
    tennure: string,
    pathName: string,
    teamId: string,
    monitor_http_gprcId: string,
    monitor_sslId: string

}

interface EscalationPolicy {
    id: string,
    teamId: string,
    escalationplicy_name: string,
    isActive: boolean,
    createdAt: Date,
    escalation_policy_rules: {
        id: string;
        teamId: string | null;
        team_escalationpolicyId: string;
        alert_status: string;
        minutes_after_creation: number;
        notification_type: $Enums.notification_type;
        userId: string | null;
        user: {
            id: string,
            name: string
        } | null;
        team: {
            id: string,
            teamName: string,
        } | null;
        scheudleId: string | null;
        is_active: boolean;
    }[];
    // team:{
    //     teamName:string,
    // }
}
interface Schedule {
    id: string;
    teamId: string;
    createdAt: Date;
    name: string;
    team_schedule_rotation: {
        id: string;
        name: string;
        userId: string;
        team_scheduleId: string;
        starts_on: Date;
        frequency: $Enums.Frequency;
        ends_on: Date | null;
        custom_start_date_time: Date | null;
        custom_end_date_time: Date | null;
        restrict_time_type: $Enums.Restriction | null;
        restrict_time_start: Date | null;
        restrict_time_end: Date | null;
        user: {
            id: string;
            name: string;
        };
    }[];
    team_schedule_override: {
        id: string;
        team_scheduleId: string;
        name: string;
        start_time: Date;
        end_time: Date | null;
    }[]
}

export type ViewType = "1 Day" | "1 Week" | "2 Weeks" | "1 Month"

export interface Rotation {
    id: string
    team_scheduleId: string
    name: string
    userId: string
    starts_on: Date
    frequency: string
    ends_on: Daten | null;
    user: {
        id: string;
        name: string;
    };

}

export interface RotationBlock {
    id: string
    name: string
    startTime: Date
    endTime: Date
    userId: string
    userName:string
}

