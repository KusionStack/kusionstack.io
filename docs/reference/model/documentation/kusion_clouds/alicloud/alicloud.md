# alicloud

## Index

- [AlicloudDBConnection](#aliclouddbconnection)
- [AlicloudDBInstance](#aliclouddbinstance)
- [AlicloudInstance](#alicloudinstance)
- [AlicloudOSSBucket](#alicloudossbucket)
- [AlicloudRDSAccount](#alicloudrdsaccount)
- [AlicloudSLB](#alicloudslb)
- [AlicloudSecurityGroup](#alicloudsecuritygroup)
- [AlicloudVPC](#alicloudvpc)
- [AlicloudVswitch](#alicloudvswitch)
- [abort_multipart_upload](#abort_multipart_upload)
- [alicloud_db_instance_parameters](#alicloud_db_instance_parameters)
- [cors_rule](#cors_rule)
- [data_disks](#data_disks)
- [expiration](#expiration)
- [lifecycle_rule](#lifecycle_rule)
- [logging](#logging)
- [noncurrent_version_expiration](#noncurrent_version_expiration)
- [noncurrent_version_transition](#noncurrent_version_transition)
- [referer_config](#referer_config)
- [server_side_encryption_rule](#server_side_encryption_rule)
- [serverlessConfig](#serverlessconfig)
- [transfer_acceleration](#transfer_acceleration)
- [transitions](#transitions)
- [versioning](#versioning)
- [website](#website)


## Schemas

### AlicloudDBConnection

#### Attributes

**connection_prefix**

`str`

**connection_string**

`str`

**id**

`str`

**instance_id** *required*

`str`

**ip_address**

`str`

**port**

`str`

### AlicloudDBInstance

#### Attributes

**acl**

`str`

**auto_renew**

`bool`

**auto_renew_period**

`int`

**auto_upgrade_minor_version**

`str`

**ca_type**

`str`

**category**

`str`

**client_ca_cert**

`str`

**client_ca_enabled**

`int`

**client_cert_revocation_list**

`str`

**client_crl_enabled**

`int`

**connection_string**

`str`

**connection_string_prefix**

`str`

**db_instance_ip_array_attribute**

`str`

**db_instance_ip_array_name**

`str`

**db_instance_storage_type**

`str`

**db_time_zone**

`str`

**encryption_key**

`str`

**engine** *required*

`str`

**engine_version** *required*

`str`

**force_restart**

`bool`

**fresh_white_list_readins**

`str`

**ha_config**

`str`

**id**

`str`

**instance_charge_type**

`str`

**instance_name**

`str`

**instance_storage** *required*

`int`

**instance_type** *required*

`str`

**maintain_time**

`str`

**manual_ha_time**

`str`

**modify_mode**

`str`

**monitoring_period**

`int`

**parameters**

`[alicloud_db_instance_parameters]`

**period**

`int`

**port**

`str`

**private_ip_address**

`str`

**released_keep_policy**

`str`

**replication_acl**

`str`

**resource_group_id**

`str`

**security_group_id**

`str`

**security_group_ids**

`[str]`

**security_ip_mode**

`str`

**security_ip_type**

`str`

**security_ips**

`[str]`

**server_cert**

`str`

**server_key**

`str`

**serverless_config**

`[serverlessConfig]`

**sql_collector_config_value**

`int`

**sql_collector_status**

`str`

**ssl_action**

`str`

**ssl_status**

`str`

**storage_auto_scale**

`str`

**storage_threshold**

`int`

**storage_upper_bound**

`int`

**switch_time**

`str`

**tags**

`{str:str}`

**target_minor_version**

`str`

**tde_status**

`str`

**upgrade_db_instance_kernel_version**

`bool`

**upgrade_time**

`str`

**vswitch_id**

`str`

**whitelist_network_type**

`str`

**zone_id**

`str`

**zone_id_slave_a**

`str`

**zone_id_slave_b**

`str`

### AlicloudInstance

#### Attributes

**allocate_public_ip**

`bool`

**auto_release_time**

`str`

**auto_renew_period**

`int`

**availability_zone**

`str`

**credit_specification**

`str`

**data_disks**

`[data_disks]`

**deletion_protection**

`bool`

**deployment_set_group_no**

`str`

**deployment_set_id**

`str`

**description**

`str`

**dry_run**

`bool`

**force_delete**

`bool`

**host_name**

`str`

**hpc_cluster_id**

`str`

**id**

`str`

**image_id** *required*

`str`

**include_data_disks**

`bool`

**instance_charge_type**

`str`

**instance_name**

`str`

**instance_type** *required*

`str`

**internet_charge_type**

`str`

**internet_max_bandwidth_in**

`int`

**internet_max_bandwidth_out**

`int`

**io_optimized**

`str`

**is_outdated**

`bool`

**key_name**

`str`

**kms_encrypted_password**

`str`

**kms_encryption_context**

`{str:str}`

**password**

`str`

**period**

`int`

**period_unit**

`str`

**private_ip**

`str`

**public_ip**

`str`

**renewal_status**

`str`

**resource_group_id**

`str`

**role_name**

`str`

**secondary_private_ip_address_count**

`int`

**secondary_private_ips**

`[str]`

**security_enhancement_strategy**

`str`

**security_groups** *required*

`[str]`

**spot_price_limit**

`int`

**spot_strategy**

`str`

**status**

`str`

**subnet_id**

`str`

**system_disk_auto_snapshot_policy_id**

`str`

**system_disk_category**

`str`

**system_disk_description**

`str`

**system_disk_name**

`str`

**system_disk_performance_level**

`str`

**system_disk_size**

`int`

**tags**

`{str:str}`

**user_data**

`str`

**volume_tags**

`{str:str}`

**vswitch_id**

`str`

### AlicloudOSSBucket

#### Attributes

**acl**

`str`

**bucket**

`str`

**cors_rule**

`[cors_rule]`

**creation_date**

`str`

**extranet_endpoint**

`str`

**force_destroy**

`bool`

**id**

`str`

**intranet_endpoint**

`str`

**lifecycle_rule**

`[lifecycle_rule]`

**location**

`str`

**logging**

`[logging]`

**logging_isenable**

`bool`

**owner**

`str`

**policy**

`str`

**redundancy_type**

`str`

**referer_config**

`[referer_config]`

**server_side_encryption_rule**

`[server_side_encryption_rule]`

**storage_class**

`str`

**tags**

`{str:str}`

**transfer_acceleration**

`[transfer_acceleration]`

**versioning**

`[versioning]`

**website**

`[website]`

### AlicloudRDSAccount

#### Attributes

**account_description**

`str`

**account_name**

`str`

**account_password**

`str`

**account_type**

`str`

**db_instance_id**

`str`

**description**

`str`

**id**

`str`

**instance_id**

`str`

**kms_encrypted_password**

`str`

**kms_encryption_context**

`{str:str}`

**name**

`str`

**password**

`str`

**status**

`str`

**type**

`str`

### AlicloudSLB

#### Attributes

**address**

`str`

**address_ip_version**

`str`

**address_type**

`str`

**bandwidth**

`int`

**delete_protection**

`str`

**id**

`str`

**instance_charge_type**

`str`

**internet**

`bool`

**internet_charge_type**

`str`

**load_balancer_name**

`str`

**load_balancer_spec**

`str`

**master_zone_id**

`str`

**modification_protection_reason**

`str`

**modification_protection_status**

`str`

**name**

`str`

**payment_type**

`str`

**period**

`int`

**resource_group_id**

`str`

**slave_zone_id**

`str`

**specification**

`str`

**status**

`str`

**tags**

`{str:str}`

**vswitch_id**

`str`

### AlicloudSecurityGroup

#### Attributes

**description**

`str`

**id**

`str`

**inner_access**

`bool`

**inner_access_policy**

`str`

**name**

`str`

**resource_group_id**

`str`

**security_group_type**

`str`

**tags**

`{str:str}`

**vpc_id**

`str`

### AlicloudVPC

#### Attributes

**cidr_block**

`str`

**description**

`str`

**dry_run**

`bool`

**enable_ipv6**

`bool`

**id**

`str`

**ipv6_cidr_block**

`str`

**name**

`str`

**resource_group_id**

`str`

**route_table_id**

`str`

**router_id**

`str`

**router_table_id**

`str`

**secondary_cidr_blocks**

`[str]`

**status**

`str`

**tags**

`{str:str}`

**user_cidrs**

`[str]`

**vpc_name**

`str`

### AlicloudVswitch

#### Attributes

**availability_zone**

`str`

**cidr_block** *required*

`str`

**description**

`str`

**id**

`str`

**name**

`str`

**status**

`str`

**tags**

`{str:str}`

**vpc_id** *required*

`str`

**vswitch_name**

`str`

**zone_id**

`str`

### abort_multipart_upload

#### Attributes

**created_before_date**

`str`

**days**

`int`

### alicloud_db_instance_parameters

#### Attributes

**name** *required*

`str`

**value** *required*

`str`

### cors_rule

#### Attributes

**allowed_headers**

`[str]`

**allowed_methods** *required*

`[str]`

**allowed_origins** *required*

`[str]`

**expose_headers**

`[str]`

**max_age_seconds**

`int`

### data_disks

#### Attributes

**auto_snapshot_policy_id**

`str`

**category**

`str`

**delete_with_instance**

`bool`

**description**

`str`

**encrypted**

`bool`

**kms_key_id**

`str`

**name**

`str`

**performance_level**

`str`

**size** *required*

`int`

**snapshot_id**

`str`

### expiration

#### Attributes

**created_before_date**

`str`

**date**

`str`

**days**

`int`

**expired_object_delete_marker**

`bool`

### lifecycle_rule

#### Attributes

**abort_multipart_upload**

`[abort_multipart_upload]`

**enabled** *required*

`bool`

**expiration**

`[expiration]`

**id**

`str`

**noncurrent_version_expiration**

`[noncurrent_version_expiration]`

**noncurrent_version_transition**

`[noncurrent_version_transition]`

**prefix**

`str`

**transitions**

`[transitions]`

### logging

#### Attributes

**target_bucket** *required*

`str`

**target_prefix**

`str`

### noncurrent_version_expiration

#### Attributes

**days** *required*

`int`

### noncurrent_version_transition

#### Attributes

**days** *required*

`int`

**storage_class** *required*

`str`

### referer_config

#### Attributes

**allow_empty**

`bool`

**referers** *required*

`[str]`

### server_side_encryption_rule

#### Attributes

**kms_master_key_id**

`str`

**sse_algorithm** *required*

`str`

### serverlessConfig

#### Attributes

**auto_pause** *required*

`bool`

**max_capacity** *required*

`float`

**min_capacity** *required*

`float`

**switch_force** *required*

`bool`

### transfer_acceleration

#### Attributes

**enabled** *required*

`bool`

### transitions

#### Attributes

**created_before_date**

`str`

**days**

`int`

**storage_class**

`str`

### versioning

#### Attributes

**status** *required*

`str`

### website

#### Attributes

**error_document**

`str`

**index_document** *required*

`str`

<!-- Auto generated by kcl-doc tool, please do not edit. -->
