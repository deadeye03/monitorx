
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.0.0
 * Query Engine version: 5dbef10bdbfb579e07d35cc85fb1518d357cb99e
 */
Prisma.prismaVersion = {
  client: "6.0.0",
  engine: "5dbef10bdbfb579e07d35cc85fb1518d357cb99e"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  supaId: 'supaId',
  name: 'name',
  email: 'email',
  number: 'number',
  photo: 'photo',
  is_phone_number_verified: 'is_phone_number_verified'
};

exports.Prisma.User_otpScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  otp: 'otp',
  invalid: 'invalid',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.Monitor_configScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  monitorType: 'monitorType',
  is_active: 'is_active',
  workspaceId: 'workspaceId',
  teamId: 'teamId',
  createdAt: 'createdAt'
};

exports.Prisma.Monitor_HTTP_gPRC_configScalarFieldEnum = {
  id: 'id',
  monitor_configId: 'monitor_configId',
  authType: 'authType',
  interval_check: 'interval_check',
  userName: 'userName',
  password: 'password',
  inital_token: 'inital_token',
  refresh_token: 'refresh_token',
  header_key: 'header_key',
  header_value: 'header_value',
  endpoint_url: 'endpoint_url',
  failure_count: 'failure_count',
  success_count: 'success_count',
  success_response_code: 'success_response_code'
};

exports.Prisma.Monitor_SSL_configScalarFieldEnum = {
  id: 'id',
  monitor_configId: 'monitor_configId',
  endpoint_url: 'endpoint_url',
  alt_names: 'alt_names',
  is_wildcard: 'is_wildcard',
  wildcard_url: 'wildcard_url',
  certifcate_issue: 'certifcate_issue',
  certificate_tenure: 'certificate_tenure',
  expiry_reminder: 'expiry_reminder'
};

exports.Prisma.Monitor_System_componentsScalarFieldEnum = {
  id: 'id',
  monitor_configId: 'monitor_configId',
  components_lists: 'components_lists',
  is_cloud: 'is_cloud',
  cloud_service_url: 'cloud_service_url',
  cloud_userName: 'cloud_userName',
  cloud_password: 'cloud_password',
  cloud_downloadUrl: 'cloud_downloadUrl'
};

exports.Prisma.WorkSpaceScalarFieldEnum = {
  id: 'id',
  ownerId: 'ownerId',
  workspace_name: 'workspace_name',
  trial_startDate: 'trial_startDate',
  trial_endDate: 'trial_endDate',
  subscription_start: 'subscription_start',
  subscription_end: 'subscription_end'
};

exports.Prisma.Invited_usersScalarFieldEnum = {
  id: 'id',
  invited_user_name: 'invited_user_name',
  invited_user_email_id: 'invited_user_email_id',
  invited_by: 'invited_by',
  workspaceId: 'workspaceId',
  role: 'role',
  status: 'status',
  invited_on: 'invited_on'
};

exports.Prisma.WorkSpace_usersScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  workspaceId: 'workspaceId',
  role: 'role',
  createdAt: 'createdAt'
};

exports.Prisma.TeamScalarFieldEnum = {
  id: 'id',
  creatorId: 'creatorId',
  workspaceId: 'workspaceId',
  teamName: 'teamName',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.Team_memberScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  workspace_userId: 'workspace_userId',
  workspaceId: 'workspaceId'
};

exports.Prisma.AlertScalarFieldEnum = {
  id: 'id',
  acknowledged: 'acknowledged',
  monitor_configId: 'monitor_configId',
  userId: 'userId',
  workspaceId: 'workspaceId',
  createdAt: 'createdAt'
};

exports.Prisma.Team_escalationpolicyScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  escalationplicy_name: 'escalationplicy_name',
  isActive: 'isActive',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.Escalation_policy_rulesScalarFieldEnum = {
  id: 'id',
  team_escalationpolicyId: 'team_escalationpolicyId',
  alert_status: 'alert_status',
  minutes_after_creation: 'minutes_after_creation',
  notification_type: 'notification_type',
  userId: 'userId',
  scheudleId: 'scheudleId',
  teamId: 'teamId',
  is_active: 'is_active'
};

exports.Prisma.Team_scheduleScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  name: 'name',
  createdAt: 'createdAt'
};

exports.Prisma.Team_schedule_rotationScalarFieldEnum = {
  id: 'id',
  team_scheduleId: 'team_scheduleId',
  name: 'name',
  userId: 'userId',
  starts_on: 'starts_on',
  frequency: 'frequency',
  ends_on: 'ends_on',
  custom_start_date_time: 'custom_start_date_time',
  custom_end_date_time: 'custom_end_date_time',
  restrict_time_type: 'restrict_time_type',
  restrict_time_start: 'restrict_time_start',
  restrict_time_end: 'restrict_time_end'
};

exports.Prisma.Team_schedule_overrideScalarFieldEnum = {
  id: 'id',
  team_scheduleId: 'team_scheduleId',
  name: 'name',
  start_time: 'start_time',
  end_time: 'end_time'
};

exports.Prisma.ContactUsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  phoneNumber: 'phoneNumber',
  email: 'email',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};
exports.Role = exports.$Enums.Role = {
  owner: 'owner',
  admin: 'admin',
  user: 'user',
  stackholder: 'stackholder'
};

exports.status = exports.$Enums.status = {
  verified: 'verified',
  unverified: 'unverified'
};

exports.notification_type = exports.$Enums.notification_type = {
  user: 'user',
  on_call: 'on_call',
  team: 'team',
  members: 'members',
  admin: 'admin',
  notify_users: 'notify_users'
};

exports.Frequency = exports.$Enums.Frequency = {
  daily: 'daily',
  weekly: 'weekly',
  custom: 'custom'
};

exports.Restriction = exports.$Enums.Restriction = {
  time_of_day: 'time_of_day',
  weekday: 'weekday'
};

exports.Prisma.ModelName = {
  User: 'User',
  user_otp: 'user_otp',
  Monitor_config: 'Monitor_config',
  Monitor_HTTP_gPRC_config: 'Monitor_HTTP_gPRC_config',
  Monitor_SSL_config: 'Monitor_SSL_config',
  Monitor_System_components: 'Monitor_System_components',
  WorkSpace: 'WorkSpace',
  invited_users: 'invited_users',
  WorkSpace_users: 'WorkSpace_users',
  team: 'team',
  team_member: 'team_member',
  alert: 'alert',
  team_escalationpolicy: 'team_escalationpolicy',
  escalation_policy_rules: 'escalation_policy_rules',
  team_schedule: 'team_schedule',
  team_schedule_rotation: 'team_schedule_rotation',
  team_schedule_override: 'team_schedule_override',
  contactUs: 'contactUs'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
