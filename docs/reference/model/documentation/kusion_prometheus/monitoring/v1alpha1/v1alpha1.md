# v1alpha1

## Index

- [AlertmanagerConfig](#alertmanagerconfig)
- [AlertmanagerConfigSpec](#alertmanagerconfigspec)
- [DayOfMonthRange](#dayofmonthrange)
- [EmailConfig](#emailconfig)
- [HTTPConfig](#httpconfig)
- [InhibitRule](#inhibitrule)
- [KeyValue](#keyvalue)
- [Matcher](#matcher)
- [MuteTimeInterval](#mutetimeinterval)
- [OpsGenieConfig](#opsgenieconfig)
- [OpsGenieConfigResponder](#opsgenieconfigresponder)
- [PagerDutyConfig](#pagerdutyconfig)
- [PagerDutyImageConfig](#pagerdutyimageconfig)
- [PagerDutyLinkConfig](#pagerdutylinkconfig)
- [PushoverConfig](#pushoverconfig)
- [Receiver](#receiver)
- [Route](#route)
- [SNSConfig](#snsconfig)
- [SlackAction](#slackaction)
- [SlackConfig](#slackconfig)
- [SlackConfirmationField](#slackconfirmationfield)
- [SlackField](#slackfield)
- [TelegramConfig](#telegramconfig)
- [TimeInterval](#timeinterval)
- [TimeRange](#timerange)
- [VictorOpsConfig](#victoropsconfig)
- [WeChatConfig](#wechatconfig)
- [WebhookConfig](#webhookconfig)


## Schemas

### AlertmanagerConfig

AlertmanagerConfig defines a namespaced AlertmanagerConfig to be aggregated across multiple namespaces configuring one Alertmanager cluster.

#### Attributes

**apiVersion** *required* *readOnly*

`"monitoring.coreos.com/v1alpha1"`

APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

**kind** *required* *readOnly*

`"AlertmanagerConfig"`

Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

**metadata**

`ObjectMeta`

metadata

**spec** *required*

`AlertmanagerConfigSpec`

spec

### AlertmanagerConfigSpec

AlertmanagerConfigSpec is a specification of the desired behavior of the Alertmanager configuration. By definition, the Alertmanager configuration only applies to alerts for which the `namespace` label is equal to the namespace of the AlertmanagerConfig resource.

#### Attributes

**inhibitRules**

`[InhibitRule]`

List of inhibition rules. The rules will only apply to alerts matching the resource’s namespace.

**muteTimeIntervals**

`[MuteTimeInterval]`

List of MuteTimeInterval specifying when the routes should be muted.

**receivers**

`[Receiver]`

List of receivers.

**route**

`Route`

route

### DayOfMonthRange

DayOfMonthRange is an inclusive range of days of the month beginning at 1

#### Attributes

**end**

`int`

End of the inclusive range

**start**

`int`

Start of the inclusive range

### EmailConfig

EmailConfig configures notifications via Email.

#### Attributes

**authIdentity**

`str`

The identity to use for authentication.

**authPassword**

`SecretKeySelector`

auth password

**authSecret**

`SecretKeySelector`

auth secret

**authUsername**

`str`

The username to use for authentication.

**from**

`str`

The sender address.

**headers**

`[KeyValue]`

Further headers email header key/value pairs. Overrides any headers previously set by the notification implementation.

**hello**

`str`

The hostname to identify to the SMTP server.

**html**

`str`

The HTML body of the email notification.

**requireTLS**

`bool`

The SMTP TLS requirement. Note that Go does not support unencrypted connections to remote SMTP endpoints.

**sendResolved**

`bool`

Whether or not to notify about resolved alerts.

**smarthost**

`str`

The SMTP host and port through which emails are sent. E.g. example.com:25

**text**

`str`

The text body of the email notification.

**tlsConfig**

`SafeTLSConfig`

tls config

**to**

`str`

The email address to send notifications to.

### HTTPConfig

HTTP client configuration.

#### Attributes

**authorization**

`SafeAuthorization`

authorization

**basicAuth**

`BasicAuth`

basic auth

**bearerTokenSecret**

`SecretKeySelector`

bearer token secret

**followRedirects**

`bool`

FollowRedirects specifies whether the client should follow HTTP 3xx redirects.

**oauth2**

`OAuth2`

oauth2

**proxyURL**

`str`

Optional proxy URL.

**tlsConfig**

`SafeTLSConfig`

tls config

### InhibitRule

InhibitRule defines an inhibition rule that allows to mute alerts when other alerts are already firing. See https://prometheus.io/docs/alerting/latest/configuration/#inhibit_rule

#### Attributes

**equal**

`[str]`

Labels that must have an equal value in the source and target alert for the inhibition to take effect.

**sourceMatch**

`[Matcher]`

Matchers for which one or more alerts have to exist for the inhibition to take effect. The operator enforces that the alert matches the resource’s namespace.

**targetMatch**

`[Matcher]`

Matchers that have to be fulfilled in the alerts to be muted. The operator enforces that the alert matches the resource’s namespace.

### KeyValue

KeyValue defines a (key, value) tuple.

#### Attributes

**key** *required*

`str`

Key of the tuple.

**value** *required*

`str`

Value of the tuple.

### Matcher

Matcher defines how to match on alert&#39;s labels.

#### Attributes

**matchType**

`"!=" | "=" | "=~" | "!~"`

Match operation available with AlertManager &gt;= v0.22.0 and takes precedence over Regex (deprecated) if non-empty.

**name** *required*

`str`

Label to match.

**regex**

`bool`

Whether to match on equality (false) or regular-expression (true). Deprecated as of AlertManager &gt;= v0.22.0 where a user should use MatchType instead.

**value**

`str`

Label value to match.

### MuteTimeInterval

MuteTimeInterval specifies the periods in time when notifications will be muted

#### Attributes

**name**

`str`

Name of the time interval

**timeIntervals**

`[TimeInterval]`

TimeIntervals is a list of TimeInterval

### OpsGenieConfig

OpsGenieConfig configures notifications via OpsGenie. See https://prometheus.io/docs/alerting/latest/configuration/#opsgenie_config

#### Attributes

**actions**

`str`

Comma separated list of actions that will be available for the alert.

**apiKey**

`SecretKeySelector`

api key

**apiURL**

`str`

The URL to send OpsGenie API requests to.

**description**

`str`

Description of the incident.

**details**

`[KeyValue]`

A set of arbitrary key/value pairs that provide further detail about the incident.

**entity**

`str`

Optional field that can be used to specify which domain alert is related to.

**httpConfig**

`HTTPConfig`

http config

**message**

`str`

Alert text limited to 130 characters.

**note**

`str`

Additional alert note.

**priority**

`str`

Priority level of alert. Possible values are P1, P2, P3, P4, and P5.

**responders**

`[OpsGenieConfigResponder]`

List of responders responsible for notifications.

**sendResolved**

`bool`

Whether or not to notify about resolved alerts.

**source**

`str`

Backlink to the sender of the notification.

**tags**

`str`

Comma separated list of tags attached to the notifications.

**updateAlerts**

`bool`

Whether to update message and description of the alert in OpsGenie if it already exists By default, the alert is never updated in OpsGenie, the new message only appears in activity log.

### OpsGenieConfigResponder

OpsGenieConfigResponder defines a responder to an incident. One of `id`, `name` or `username` has to be defined.

#### Attributes

**id**

`str`

ID of the responder.

**name**

`str`

Name of the responder.

**type** *required*

`"team" | "teams" | "user" | "escalation" | "schedule"`

**username**

`str`

Username of the responder.

### PagerDutyConfig

PagerDutyConfig configures notifications via PagerDuty. See https://prometheus.io/docs/alerting/latest/configuration/#pagerduty_config

#### Attributes

**class**

`str`

The class/type of the event.

**client**

`str`

Client identification.

**clientURL**

`str`

Backlink to the sender of notification.

**component**

`str`

The part or component of the affected system that is broken.

**description**

`str`

Description of the incident.

**details**

`[KeyValue]`

Arbitrary key/value pairs that provide further detail about the incident.

**group**

`str`

A cluster or grouping of sources.

**httpConfig**

`HTTPConfig`

http config

**pagerDutyImageConfigs**

`[PagerDutyImageConfig]`

A list of image details to attach that provide further detail about an incident.

**pagerDutyLinkConfigs**

`[PagerDutyLinkConfig]`

A list of link details to attach that provide further detail about an incident.

**routingKey**

`SecretKeySelector`

routing key

**sendResolved**

`bool`

Whether or not to notify about resolved alerts.

**serviceKey**

`SecretKeySelector`

service key

**severity**

`str`

Severity of the incident.

**url**

`str`

The URL to send requests to.

### PagerDutyImageConfig

PagerDutyImageConfig attaches images to an incident

#### Attributes

**alt**

`str`

Alt is the optional alternative text for the image.

**href**

`str`

Optional URL; makes the image a clickable link.

**src**

`str`

Src of the image being attached to the incident

### PagerDutyLinkConfig

PagerDutyLinkConfig attaches text links to an incident

#### Attributes

**alt**

`str`

Text that describes the purpose of the link, and can be used as the link&#39;s text.

**href**

`str`

Href is the URL of the link to be attached

### PushoverConfig

PushoverConfig configures notifications via Pushover. See https://prometheus.io/docs/alerting/latest/configuration/#pushover_config

#### Attributes

**expire**

`str`

How long your notification will continue to be retried for, unless the user acknowledges the notification.

**html**

`bool`

Whether notification message is HTML or plain text.

**httpConfig**

`HTTPConfig`

http config

**message**

`str`

Notification message.

**priority**

`str`

Priority, see https://pushover.net/api#priority

**retry**

`str`

How often the Pushover servers will send the same notification to the user. Must be at least 30 seconds.

**sendResolved**

`bool`

Whether or not to notify about resolved alerts.

**sound**

`str`

The name of one of the sounds supported by device clients to override the user&#39;s default sound choice

**title**

`str`

Notification title.

**token**

`SecretKeySelector`

token

**url**

`str`

A supplementary URL shown alongside the message.

**urlTitle**

`str`

A title for supplementary URL, otherwise just the URL is shown

**userKey**

`SecretKeySelector`

user key

### Receiver

Receiver defines one or more notification integrations.

#### Attributes

**emailConfigs**

`[EmailConfig]`

List of Email configurations.

**name** *required*

`str`

Name of the receiver. Must be unique across all items from the list.

**opsgenieConfigs**

`[OpsGenieConfig]`

List of OpsGenie configurations.

**pagerdutyConfigs**

`[PagerDutyConfig]`

List of PagerDuty configurations.

**pushoverConfigs**

`[PushoverConfig]`

List of Pushover configurations.

**slackConfigs**

`[SlackConfig]`

List of Slack configurations.

**snsConfigs**

`[SNSConfig]`

List of SNS configurations

**telegramConfigs**

`[TelegramConfig]`

List of Telegram configurations.

**victoropsConfigs**

`[VictorOpsConfig]`

List of VictorOps configurations.

**webhookConfigs**

`[WebhookConfig]`

List of webhook configurations.

**wechatConfigs**

`[WeChatConfig]`

List of WeChat configurations.

### Route

The Alertmanager route definition for alerts matching the resource’s namespace. If present, it will be added to the generated Alertmanager configuration as a first-level route.

#### Attributes

**continue**

`bool`

Boolean indicating whether an alert should continue matching subsequent sibling nodes. It will always be overridden to true for the first-level route by the Prometheus operator.

**groupBy**

`[str]`

List of labels to group by. Labels must not be repeated (unique list). Special label &#34;...&#34; (aggregate by all possible labels), if provided, must be the only element in the list.

**groupInterval**

`str`

How long to wait before sending an updated notification. Must match the regular expression`^(([0-9]+)y)?(([0-9]+)w)?(([0-9]+)d)?(([0-9]+)h)?(([0-9]+)m)?(([0-9]+)s)?(([0-9]+)ms)?$` Example: &#34;5m&#34;

**groupWait**

`str`

How long to wait before sending the initial notification. Must match the regular expression`^(([0-9]+)y)?(([0-9]+)w)?(([0-9]+)d)?(([0-9]+)h)?(([0-9]+)m)?(([0-9]+)s)?(([0-9]+)ms)?$` Example: &#34;30s&#34;

**matchers**

`[Matcher]`

List of matchers that the alert’s labels should match. For the first level route, the operator removes any existing equality and regexp matcher on the `namespace` label and adds a `namespace: &lt;object namespace&gt;` matcher.

**muteTimeIntervals**

`[str]`

Note: this comment applies to the field definition above but appears below otherwise it gets included in the generated manifest. CRD schema doesn&#39;t support self-referential types for now (see https://github.com/kubernetes/kubernetes/issues/62872). We have to use an alternative type to circumvent the limitation. The downside is that the Kube API can&#39;t validate the data beyond the fact that it is a valid JSON representation. MuteTimeIntervals is a list of MuteTimeInterval names that will mute this route when matched,

**receiver**

`str`

Name of the receiver for this route. If not empty, it should be listed in the `receivers` field.

**repeatInterval**

`str`

How long to wait before repeating the last notification. Must match the regular expression`^(([0-9]+)y)?(([0-9]+)w)?(([0-9]+)d)?(([0-9]+)h)?(([0-9]+)m)?(([0-9]+)s)?(([0-9]+)ms)?$` Example: &#34;4h&#34;

**routes**

`[]`

Child routes.

### SNSConfig

SNSConfig configures notifications via AWS SNS. See https://prometheus.io/docs/alerting/latest/configuration/#sns_configs

#### Attributes

**apiURL**

`str`

The SNS API URL i.e. https://sns.us-east-2.amazonaws.com. If not specified, the SNS API URL from the SNS SDK will be used.

**attributes**

`{str:str}`

SNS message attributes.

**httpConfig**

`HTTPConfig`

http config

**message**

`str`

The message content of the SNS notification.

**phoneNumber**

`str`

Phone number if message is delivered via SMS in E.164 format. If you don&#39;t specify this value, you must specify a value for the TopicARN or TargetARN.

**sendResolved**

`bool`

Whether or not to notify about resolved alerts.

**sigv4**

`Sigv4`

sigv4

**subject**

`str`

Subject line when the message is delivered to email endpoints.

**targetARN**

`str`

The  mobile platform endpoint ARN if message is delivered via mobile notifications. If you don&#39;t specify this value, you must specify a value for the topic_arn or PhoneNumber.

**topicARN**

`str`

SNS topic ARN, i.e. arn:aws:sns:us-east-2:698519295917:My-Topic If you don&#39;t specify this value, you must specify a value for the PhoneNumber or TargetARN.

### SlackAction

SlackAction configures a single Slack action that is sent with each notification. See https://api.slack.com/docs/message-attachments#action_fields and https://api.slack.com/docs/message-buttons for more information.

#### Attributes

**confirm**

`SlackConfirmationField`

confirm

**name**

`str`

name

**style**

`str`

style

**text** *required*

`str`

text

**type** *required*

`str`

**url**

`str`

url

**value**

`str`

value

### SlackConfig

SlackConfig configures notifications via Slack. See https://prometheus.io/docs/alerting/latest/configuration/#slack_config

#### Attributes

**actions**

`[SlackAction]`

A list of Slack actions that are sent with each notification.

**apiURL**

`SecretKeySelector`

api URL

**callbackId**

`str`

callback Id

**channel**

`str`

The channel or user to send notifications to.

**color**

`str`

color

**fallback**

`str`

fallback

**fields**

`[SlackField]`

A list of Slack fields that are sent with each notification.

**footer**

`str`

footer

**httpConfig**

`HTTPConfig`

http config

**iconEmoji**

`str`

icon emoji

**iconURL**

`str`

icon URL

**imageURL**

`str`

image URL

**linkNames**

`bool`

link names

**mrkdwnIn**

`[str]`

mrkdwn in

**pretext**

`str`

pretext

**sendResolved**

`bool`

Whether or not to notify about resolved alerts.

**shortFields**

`bool`

short fields

**text**

`str`

text

**thumbURL**

`str`

thumb URL

**title**

`str`

title

**titleLink**

`str`

title link

**username**

`str`

username

### SlackConfirmationField

SlackConfirmationField protect users from destructive actions or particularly distinguished decisions by asking them to confirm their button click one more time. See https://api.slack.com/docs/interactive-message-field-guide#confirmation_fields for more information.

#### Attributes

**dismissText**

`str`

dismiss text

**okText**

`str`

ok text

**text** *required*

`str`

text

**title**

`str`

title

### SlackField

SlackField configures a single Slack field that is sent with each notification. Each field must contain a title, value, and optionally, a boolean value to indicate if the field is short enough to be displayed next to other fields designated as short. See https://api.slack.com/docs/message-attachments#fields for more information.

#### Attributes

**short**

`bool`

short

**title** *required*

`str`

title

**value** *required*

`str`

value

### TelegramConfig

TelegramConfig configures notifications via Telegram. See https://prometheus.io/docs/alerting/latest/configuration/#telegram_config

#### Attributes

**apiURL**

`str`

The Telegram API URL i.e. https://api.telegram.org. If not specified, default API URL will be used.

**botToken**

`SecretKeySelector`

bot token

**chatID**

`int`

The Telegram chat ID.

**disableNotifications**

`bool`

Disable telegram notifications

**httpConfig**

`HTTPConfig`

http config

**message**

`str`

Message template

**parseMode**

`"MarkdownV2" | "Markdown" | "HTML"`

Parse mode for telegram message

**sendResolved**

`bool`

Whether to notify about resolved alerts.

### TimeInterval

TimeInterval describes intervals of time

#### Attributes

**daysOfMonth**

`[DayOfMonthRange]`

DaysOfMonth is a list of DayOfMonthRange

**months**

`[str]`

Months is a list of MonthRange

**times**

`[TimeRange]`

Times is a list of TimeRange

**weekdays**

`[str]`

Weekdays is a list of WeekdayRange

**years**

`[str]`

Years is a list of YearRange

### TimeRange

TimeRange defines a start and end time in 24hr format

#### Attributes

**endTime**

`str`

EndTime is the end time in 24hr format.

**startTime**

`str`

StartTime is the start time in 24hr format.

### VictorOpsConfig

VictorOpsConfig configures notifications via VictorOps. See https://prometheus.io/docs/alerting/latest/configuration/#victorops_config

#### Attributes

**apiKey**

`SecretKeySelector`

api key

**apiUrl**

`str`

The VictorOps API URL.

**customFields**

`[KeyValue]`

Additional custom fields for notification.

**entityDisplayName**

`str`

Contains summary of the alerted problem.

**httpConfig**

`HTTPConfig`

http config

**messageType**

`str`

Describes the behavior of the alert (CRITICAL, WARNING, INFO).

**monitoringTool**

`str`

The monitoring tool the state message is from.

**routingKey**

`str`

A key used to map the alert to a team.

**sendResolved**

`bool`

Whether or not to notify about resolved alerts.

**stateMessage**

`str`

Contains long explanation of the alerted problem.

### WeChatConfig

WeChatConfig configures notifications via WeChat. See https://prometheus.io/docs/alerting/latest/configuration/#wechat_config

#### Attributes

**agentID**

`str`

agent ID

**apiSecret**

`SecretKeySelector`

api secret

**apiURL**

`str`

The WeChat API URL.

**corpID**

`str`

The corp id for authentication.

**httpConfig**

`HTTPConfig`

http config

**message**

`str`

API request data as defined by the WeChat API.

**messageType**

`str`

message type

**sendResolved**

`bool`

Whether or not to notify about resolved alerts.

**toParty**

`str`

to party

**toTag**

`str`

to tag

**toUser**

`str`

to user

### WebhookConfig

WebhookConfig configures notifications via a generic receiver supporting the webhook payload. See https://prometheus.io/docs/alerting/latest/configuration/#webhook_config

#### Attributes

**httpConfig**

`HTTPConfig`

http config

**maxAlerts**

`int`

Maximum number of alerts to be sent per webhook message. When 0, all alerts are included.

**sendResolved**

`bool`

Whether or not to notify about resolved alerts.

**url**

`str`

The URL to send HTTP POST requests to. `urlSecret` takes precedence over `url`. One of `urlSecret` and `url` should be defined.

**urlSecret**

`SecretKeySelector`

url secret

<!-- Auto generated by kcl-doc tool, please do not edit. -->
