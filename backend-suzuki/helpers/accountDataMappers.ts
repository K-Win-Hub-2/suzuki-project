interface UserDatas {
  isSuperAdmin: boolean;
  showroom: string | null;
  name: string | null;
  userName: string | null;
  code: string | null;
  email: string | null;
  password: string | null;
  phone: string | null;
  address: string | null;
  townShip: string | null;
  region: string | null;
  state: string | null;
  isBanned: boolean | null;
  bannedReason: string | null;
  url: string | null;
  role: string | null;
}

//filter null from parameter
const filterNullOrUndefined = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, val]) => val != null)
  ) as Partial<T>;
};

const superAdminAccountDataToImplementDatabase = (
  data: UserDatas
): Partial<UserDatas> => {
  return filterNullOrUndefined({
    isSuperAdmin: data.isSuperAdmin,
    name: data.name,
    userName: data.userName,
    showroom: data.showroom,
    code: data.code,
    email: data.email,
    password: data.password,
    phone: data.phone,
    address: data.address,
    townShip: data.townShip,
    region: data.region,
    state: data.state,
    isBanned: data.isBanned,
    bannedReason: data.bannedReason,
    role: data.role,
  });
};

interface CustomerData {
  name: string | null;
  email: string | null;
  password: string | null;
  phone: string | null;
  address: string | null;
  isBanned: boolean | null;
  bannedReason: string | null;
  url: string | null;
}
const customerDataToImplementDatabase = (
  data: CustomerData
): Partial<CustomerData> => {
  return filterNullOrUndefined({
    isDeleted: false,
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
    address: data.address,
    isBanned: data.isBanned,
    bannedReason: data.bannedReason,
  });
};

export {
  superAdminAccountDataToImplementDatabase,
  customerDataToImplementDatabase,
  UserDatas,
  CustomerData,
};
