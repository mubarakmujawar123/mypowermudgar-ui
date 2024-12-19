import { constantMap } from "@/config/constant";
import { useToast } from "@/hooks/use-toast";
import {
  getOrdersStatusDataForAdmin,
  getUsersStatusForAdmin,
} from "@/store/admin/dashboardSlice";
import { PackageOpen, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const calculateTotal = (obj) => {
  let total = 0;
  if (obj) {
    total = Object.keys(obj).reduce(
      (prevTotal, currentKey) => prevTotal + obj[currentKey],
      0
    );
  }
  return total;
};

const AdminDashboard = () => {
  const [userStatus, setUserStatus] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [totalUser, setTotalUser] = useState(null);
  const [totalOrder, setTotalOrder] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersStatusDataForAdmin()).then((data) => {
      if (data?.payload?.success) {
        setOrderStatus(data?.payload?.data);
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
    dispatch(getUsersStatusForAdmin()).then((data) => {
      if (data?.payload?.success) {
        setUserStatus(data?.payload?.data);
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }, []);
  useEffect(() => {
    if (orderStatus) {
      setTotalOrder(calculateTotal(orderStatus));
    }
  }, [orderStatus]);
  useEffect(() => {
    if (userStatus) {
      setTotalUser(calculateTotal(userStatus));
    }
  }, [userStatus]);
  return (
    <div className="">
      <div className="p-6 mb-5 w-[50%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <UserRound />
        <h5 className="mb-2 mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          User : {totalUser ? totalUser : 0}
        </h5>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              <div>Verified</div>
              <div>
                {userStatus?.verifiedUserCount
                  ? userStatus?.verifiedUserCount
                  : 0}
              </div>
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              <div>Unverified </div>
              <div>
                {userStatus?.unVerifiedUserCount
                  ? userStatus?.unVerifiedUserCount
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <PackageOpen />
        <h5 className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Orders : {totalOrder ? totalOrder : 0}
        </h5>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-4">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              <div>DELIVERED </div>
              <div>{orderStatus?.DELIVERED ? orderStatus?.DELIVERED : 0}</div>
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              <div>{constantMap["INSHIPPING"]}</div>
              <div>{orderStatus?.INSHIPPING ? orderStatus?.INSHIPPING : 0}</div>
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              <div>{constantMap["INPROGRESS"]}</div>
              <div>{orderStatus?.INPROGRESS ? orderStatus?.INPROGRESS : 0}</div>
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              <div>PENDING</div>
              <div>{orderStatus?.PENDING ? orderStatus?.PENDING : 0}</div>
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              <div>CONFIRMED</div>
              <div>{orderStatus?.CONFIRMED ? orderStatus?.CONFIRMED : 0}</div>
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              <div>CANCELLED</div>
              <div>{orderStatus?.CANCELLED ? orderStatus?.CANCELLED : 0}</div>
            </div>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              <div>REJECTED</div>
              <div>{orderStatus?.REJECTED ? orderStatus?.REJECTED : 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
