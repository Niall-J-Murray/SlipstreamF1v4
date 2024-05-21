import {useQuery} from "react-query";
import {getUserData} from "../../services/user.service.ts";

export const useUserData = (userId: number | null | undefined) =>
    useQuery({
    queryKey: ["userData", userId],
    queryFn: () => getUserData(userId),
    enabled: !!userId,
});