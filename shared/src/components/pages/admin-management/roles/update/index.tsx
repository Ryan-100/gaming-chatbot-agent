'use client';
import { Box, Flex } from '@radix-ui/themes';
import { Input } from '../../../../ui/input';
import { permissionData } from '../../../../../data/PermissionList';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Label } from '../../../../ui/label';
import { useEffect, useState } from 'react';
import { Button } from '../../../../ui/button';
import { cn } from '../../../../../utils/cn';
import { useGetPermissionsQuery } from '../../../../../stores/reducers/permissions.reducers';
import {
  useGetRoleDetailQuery,
  useUpdateRoleMutation,
} from '../../../../../stores/reducers/roles.reducer';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';

interface Permission {
  name: string;
  readRoute: string[];
  writeRoute: string[];
  hideReadAction?: boolean;
  action?: string;
}

const RoleUpdate = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );

  const { data: permissionList } = useGetPermissionsQuery();
  const { data: roleData } = useGetRoleDetailQuery({ id: id });

  useEffect(() => {
    if (roleData) {
      const data = roleData.body?.data.RoleOnPermission.flatMap(
        (item) => item.Permission.route
      );
      const filterReadData =
        data?.filter((item) => item.includes('-read')) ?? [];
      const filterWriteData =
        data?.filter((item) => !item.includes('-read')) ?? [];

      const defaultReadData = permissionData.filter((item) =>
        item.readRoute.some((route) => filterReadData.includes(route))
      );

      const defaultWriteData = permissionData.filter((item) =>
        item.writeRoute.some((route) => filterWriteData.includes(route))
      );

      const combinedReadData = defaultReadData.map((item) => {
        return {
          name: item.name,
          readRoute: item.readRoute,
          writeRoute: item.writeRoute,
          action: 'read',
        };
      });
      const combinedWriteData = defaultWriteData.map((item) => {
        return {
          name: item.name,
          readRoute: item.readRoute,
          writeRoute: item.writeRoute,
          action: 'write',
        };
      });
      const finalData = [...combinedReadData, ...combinedWriteData];
      setSelectedPermissions(finalData);
      setName(roleData?.body?.data.name ?? '');
    }
  }, [roleData]);

  const handlePermissionChange = (
    permissionName: string,
    value: string,
    permissionData: Permission
  ) => {
    setSelectedPermissions((prevPermissions) => {
      const permissionIndex = prevPermissions.findIndex(
        (perm) => perm.name === permissionName
      );

      if (permissionIndex === -1) {
        return [
          ...prevPermissions,
          {
            name: permissionName,
            readRoute: permissionData.readRoute,
            writeRoute: permissionData.writeRoute,
            action: value,
          },
        ];
      }
      const updatedPermissions = [...prevPermissions];
      updatedPermissions[permissionIndex] = {
        ...updatedPermissions[permissionIndex],
        action: value,
      };

      return updatedPermissions;
    });
  };

  const [updateAction] = useUpdateRoleMutation();

  const handleSubmit = async () => {
    const filteredPermission = selectedPermissions.filter(
      (item) => item.action !== 'not-allow'
    );

    if (filteredPermission.length > 0) {
      const data = filteredPermission.map((item) => {
        if (item.action === 'write') {
          return {
            name: item.name,
            routes: item.writeRoute,
          };
        } else {
          return {
            name: item.name,
            routes: item.readRoute,
          };
        }
      });
      if (data.length > 0) {
        const localRoutes = data.flatMap((permission) => permission.routes);
        const filteredApiData = permissionList?.body?.data.filter((apiPerm) =>
          localRoutes.includes(apiPerm.route)
        );

        try {
          const response = await updateAction({
            id: id,
            data: {
              name: name,
              permissionList:
                filteredApiData?.flatMap((permission) => permission.id) ?? [],
            },
          });
          if (response.data?.meta?.success) {
            toast.success('Successfully updated Roles');
            router.back();
          } else {
            const errorResponse: any = response;
            toast.error(errorResponse?.error?.data?.meta?.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <Flex
      direction="column"
      gapY="16px"
      className="bg-background p-4 rounded-lg w-full min-w-[700px]"
    >
      <Box className="space-y-1">
        <div className="text-sm">Name</div>
        <Input
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box className="space-y-2 pt-4">
        <div className="text-sm font-semibold">Permissions</div>
        {permissionData.map((item, index) => {
          return (
            <Flex
              justify="between"
              className={cn(
                index % 2 === 0 ? 'bg-surface-secondary' : '',
                'py-3 pl-2 pr-16'
              )}
            >
              <div className="text-xs truncate">{item.name}</div>
              <RadioGroup
                className="flex items-center space-x-10 text-base"
                defaultValue="not-allow"
                value={
                  selectedPermissions.find((perm) => perm.name === item.name)
                    ?.action || 'not-allow'
                }
                onValueChange={(value) =>
                  handlePermissionChange(item.name, value, item)
                }
              >
                <Flex className="items-center space-x-2">
                  <RadioGroupItem value="write" id="write" />
                  <Label htmlFor="write" className="text-xs">
                    Read/Write
                  </Label>
                </Flex>
                {item.name === 'Inbox' ? (
                  <div className="w-[100px]" />
                ) : (
                  <Flex className="items-center space-x-2 w-[100px]">
                    <RadioGroupItem value="read" id="read" />
                    <Label htmlFor="read" className="text-xs">
                      Read Only
                    </Label>
                  </Flex>
                )}
                <Flex className="items-center space-x-2">
                  <RadioGroupItem value="not-allow" id="not-allow" />
                  <Label htmlFor="not-allow" className="text-xs">
                    Not Allow
                  </Label>
                </Flex>
              </RadioGroup>
            </Flex>
          );
        })}
      </Box>
      <Flex className="space-x-4" justify="end">
        <Button onClick={() => router.back()} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Update</Button>
      </Flex>
    </Flex>
  );
};

export default RoleUpdate;
