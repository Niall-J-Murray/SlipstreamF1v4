import UserInfo from "./UserInfo";
import DriverTable from "./DriverTable";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { postToggleTestLeague } from "../../services/league.service.ts";
import DraftControls from "./DraftControls";
import DraftPickTips from "./DraftPickTips";
import Layout from "../../components/Layout/Layout.tsx";
import IDriver from "../../types/driver.type.ts";
import IUser from "../../types/user.type.ts";
import {
  useAllTeamsInLeague,
  useLeagueData,
  useNextPickNumber,
  useNextUserToPick,
  useOpenLeague,
} from "../../hooks/queries/league-queries.ts";
import {
  useCreateTeam,
  useCreateTestTeam,
  useDeleteTeam,
  useDeleteTestTeams,
} from "../../hooks/queries/team-queries.ts";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import {
  useDriversInTeam,
  usePickDriver,
  useUndraftedDrivers,
} from "../../hooks/queries/driver-queries.ts";
import ITeam from "../../types/team.type.ts";
import ActiveLeagueInfo from "./ActiveLeagueInfo";
import * as Yup from "yup";
import PostDraftLeagueTable from "./LeagueTable/PostDraftLeagueTable";
import PreDraftLeagueTable from "./LeagueTable/PreDraftLeagueTable";
import { hideLoader, showLoader } from "../../services/loading.service.ts";
import SignIn from "../../auth-components/SignIn";

interface DashboardProps {
  userData: undefined | IUser;
}

// Todo:
//  Check test teams disappearing mid-draft after user logout.
//  Check draft add test team and draft picking functions after dashboard refactor.
//  Check team and test team delete functions on dash and admin.
//  Add password reminder or reset option.
//  Finish driver picking UX.
//  Finish loading spinner graphic, and pause page loading until all data is fetched.
//  Fix data missing data on page reloads.
//  Add toggles to show/hide certain boxes.

export default function Dashboard({ userData }: DashboardProps) {
  const [showDraftPickTips, setShowDraftPickTips] = useState<
    boolean | undefined
  >(true);
  const [isPracticeLeague, setIsPracticeLeague] = useState<
    boolean | undefined | null
  >();
  const [isLeagueFull, setIsLeagueFull] = useState<boolean | undefined | null>(
    false
  );
  const [isDraftInProgress, setIsDraftInProgress] = useState<
    boolean | undefined
  >();
  const [isLeagueActive, setIsLeagueActive] = useState<
    boolean | undefined | null
  >();
  const [isUsersTurnToPick, setIsUsersTurnToPick] = useState<boolean>(false);
  const [leagueSize, setLeagueSize] = useState<number | undefined | null>(0);
  const [leagueTeams, setLeagueTeams] = useState<
    Array<ITeam> | undefined | null
  >([]);
  const [selectedDriver, setSelectedDriver] = useState<
    IDriver | undefined | null
  >();
  const [lastDriverPicked, setLastDriverPicked] = useState<
    string | undefined | null
  >();
  const [lastPickTime, setLastPickTime] = useState<
    Date | string | undefined | null
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();

  const initialValues: {
    teamName: string;
  } = {
    teamName: "",
  };

  const validationSchema: Yup.ObjectSchema<object> = Yup.object().shape({
    teamName: Yup.string()
      .test(
        "length",
        "Team name must be between 3 and 20 characters",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("Please enter a valid team name"),
  });

  const {
    data: openLeague,
    isLoading: loadingOpenLeague,
    error: errOpenLeague,
  } = useOpenLeague();

  const userId = userData ? userData?.id : null;
  const leagueId = userData?.team
    ? userData?.team?.leagueNumber
    : openLeague?.id;
  const teamsInLeague: Array<ITeam> | undefined | null =
    useAllTeamsInLeague(leagueId).data;

  const {
    data: leagueData,
    isLoading: loadingLeagueData,
    error: errLeagueData,
  } = useLeagueData(leagueId);

  const queryClient = useQueryClient();
  const driversInTeam = useDriversInTeam;
  const currentPickNumber = useNextPickNumber(leagueId).data;
  const nextUserToPick = useNextUserToPick(leagueId).data;
  const undraftedDrivers = useUndraftedDrivers(leagueId).data;
  const pickDriver = usePickDriver();
  const createTeam = useCreateTeam();
  const deleteTeam = useDeleteTeam(userId);
  const createTestTeam = useCreateTestTeam(leagueId);
  const deleteTestTeams = useDeleteTestTeams(leagueId);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }

    setLeagueTeams(teamsInLeague);
    setLeagueSize(leagueTeams?.length);
    setIsPracticeLeague(leagueData?.isPracticeLeague);
    setShowDraftPickTips(!leagueData?.isPracticeLeague);

    if (leagueSize && leagueSize >= 10) {
      setIsLeagueFull(true);
      if (!leagueData?.isActive) {
        setIsDraftInProgress(true);
        setShowDraftPickTips(false);
        if (userData?.id == nextUserToPick?.id || nextUserToPick?.isTestUser) {
          setIsUsersTurnToPick(true);
        } else {
          setTimeout(() => {
            queryClient
              .invalidateQueries()
              .then(() => setIsUsersTurnToPick(false));
          }, 5000);
        }
      }
    }

    setLastDriverPicked(leagueData?.lastDriverPickedName);
    setLastPickTime(leagueData?.lastPickTime);
    setSelectedDriver(
      undraftedDrivers?.find((driver: IDriver) => driver !== undefined)
    );

    if ((currentPickNumber && currentPickNumber > 20) || leagueData?.isActive) {
      setIsDraftInProgress(false);
      setIsLeagueActive(true);
    }
  }, [
    userData,
    loadingLeagueData,
    leagueData,
    isLeagueFull,
    isPracticeLeague,
    isDraftInProgress,
    isUsersTurnToPick,
    isLeagueActive,
    nextUserToPick,
    undraftedDrivers,
    currentPickNumber,
    lastDriverPicked,
  ]);

  const handleCreateTeam = (formValue: { teamName: string }) => {
    const { teamName } = formValue;
    console.log(teamName);
    // setMessage("");
    // setLoading(true);
    //
    createTeam.mutateAsync({ userId, teamName }).then(
      () => {
        queryClient.invalidateQueries().then(() => {
          if (leagueSize === 10) {
            window.location.reload();
          }
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  const handleDeleteUserTeam = () => {
    // postDeleteUserTeam(userData?.id)
    // postDeleteUserTeam(userData?.id)
    // alert("Are you sure you want to delete your team?")
    // toast("Are you sure you want to delete your team?")
    if (confirm("Are you sure you want to delete your team?")) {
      deleteTeam.mutateAsync().then(() => {
        // if (deleteTeam.isSuccess) {
        queryClient.invalidateQueries().then(() => {
          navigate("/home");
          // queryClient.invalidateQueries("leagueData")
          // queryClient.invalidateQueries("allTeamsInLeague")
        });
        // }
      });
      // setToggle(prevState => !prevState);
    }
  };

  function togglePracticeOptions() {
    if (showDraftPickTips) {
      setShowDraftPickTips(false);
    } else {
      setShowDraftPickTips(true);
    }
  }

  function togglePracticeLeague() {
    if (isPracticeLeague) {
      postToggleTestLeague(leagueId)
        .then((res) => {
          setIsPracticeLeague(res);
        })
        .then(() => navigate("/dashboard"));
    } else {
      postToggleTestLeague(leagueId)
        .then((res) => {
          setIsPracticeLeague(res);
        })
        .then(() => window.location.reload());
    }
  }

  const addTestTeam = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createTestTeam.mutateAsync().then(() => {
      queryClient
        .invalidateQueries("allTeamsInLeague")
        // queryClient.invalidateQueries()
        .then(() => {
          setLeagueTeams(teamsInLeague);
          setLeagueSize(leagueTeams?.length);
        })
        .then(() => {
          window.location.reload();
        });
    });

    if (leagueTeams && leagueTeams.length >= 9) {
      window.location.reload();
    }
  };

  const handleDeleteTestTeams = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    deleteTestTeams
      .mutateAsync()
      .then(() => {
        queryClient.invalidateQueries("allTeamsInLeague").then(() => {
          setLeagueTeams(teamsInLeague);
          setLeagueSize(leagueTeams?.length);
          setIsPracticeLeague(false);
        });
      })
      .then(() => window.location.reload());
    window.location.reload();
  };

  const handleDriverSelection = (driver: IDriver) => {
    setSelectedDriver(driver);
    return driver;
  };

  const handlePick = (
    e: { preventDefault: () => void },
    driverId: number | undefined | null
  ) => {
    // driverId: number | string | undefined) => {
    e.preventDefault();
    pickDriver
      .mutateAsync({
        userId: userId,
        driverId: driverId,
      })
      // .then(() => queryClient.invalidateQueries(["leagueData","nextPickNumber","nextUserToPick"]))
      .then(() =>
        queryClient
          .invalidateQueries()
          .then(() => setIsUsersTurnToPick(false))
          .finally(() => window.location.reload())
      );
  };

  const isLoading = loadingOpenLeague || loadingLeagueData;
  const error = errOpenLeague || errLeagueData;

  function PreDraftDashboard() {
    return (
      <>
        <div className="col-start-3 col-span-3 h-75 box-shadow">
          <UserInfo
            userData={userData}
            leagueData={leagueData}
            leagueSize={leagueSize}
            isPracticeLeague={isPracticeLeague}
            isLeagueFull={isLeagueFull}
            isLeagueActive={isLeagueActive}
            initialValues={initialValues}
            validationSchema={validationSchema}
            loading={loading}
            message={message}
            driversInTeam={driversInTeam}
            handleCreateTeam={handleCreateTeam}
            handleDeleteUserTeam={handleDeleteUserTeam}
          />
        </div>
        <div className="col-start-6 col-span-5 h-75 box-shadow">
          {showDraftPickTips ? (
            <DraftPickTips
              isPracticeLeague={isPracticeLeague}
              showDraftPickTips={showDraftPickTips}
              togglePracticeOptions={togglePracticeOptions}
            />
          ) : (
            <>
              <DraftControls
                userData={userData}
                leagueData={leagueData}
                isPracticeLeague={isPracticeLeague}
                isLeagueFull={isLeagueFull}
                showDraftPickTips={showDraftPickTips}
                selectedDriver={selectedDriver}
                lastPickTime={lastPickTime}
                lastDriverPicked={lastDriverPicked}
                currentPickNumber={currentPickNumber}
                isUsersTurnToPick={isUsersTurnToPick}
                nextUserToPick={nextUserToPick}
                togglePracticeOptions={togglePracticeOptions}
                togglePracticeLeague={togglePracticeLeague}
                addTestTeam={addTestTeam}
                handlePick={handlePick}
              />
            </>
          )}
        </div>
        <div className="col-start-3 col-span-3">
          <PreDraftLeagueTable
            leagueData={leagueData}
            leagueSize={leagueSize}
            leagueTeams={leagueTeams}
            nextUserToPick={nextUserToPick}
            isDraftInProgress={isDraftInProgress}
          />
        </div>
        <div className="col-start-6 col-span-5">
          <DriverTable
            isDraftInProgress={isDraftInProgress}
            isUsersTurnToPick={isUsersTurnToPick}
            selectedDriver={selectedDriver}
            undraftedDrivers={undraftedDrivers}
            handleDriverSelection={handleDriverSelection}
          />
        </div>
      </>
    );
  }

  function PostDraftDashboard() {
    if (!leagueData?.activeTimestamp) {
      window.location.reload();
    }
    return (
      <>
        <div className="col-start-3 col-span-3 h-125 box-shadow">
          <UserInfo
            userData={userData}
            leagueData={leagueData}
            leagueSize={leagueSize}
            isPracticeLeague={isPracticeLeague}
            isLeagueFull={isLeagueFull}
            isLeagueActive={isLeagueActive}
            initialValues={initialValues}
            validationSchema={validationSchema}
            loading={loading}
            message={message}
            driversInTeam={driversInTeam}
            handleCreateTeam={handleCreateTeam}
            handleDeleteUserTeam={handleDeleteUserTeam}
          />
          <Toaster />
        </div>
        <div className="col-start-6 col-span-5 125 box-shadow">
          <PostDraftLeagueTable
            leagueData={leagueData}
            leagueTeams={leagueTeams}
            driversInTeam={driversInTeam}
          />
          <ActiveLeagueInfo
            isPracticeLeague={isPracticeLeague}
            undraftedDrivers={undraftedDrivers}
            handleDeleteTestTeams={handleDeleteTestTeams}
          />
        </div>
        <div className="col-start-4 col-span-6">
          <DriverTable
            isDraftInProgress={isDraftInProgress}
            isUsersTurnToPick={isUsersTurnToPick}
            selectedDriver={selectedDriver}
            undraftedDrivers={undraftedDrivers}
            handleDriverSelection={handleDriverSelection}
          />
        </div>
      </>
    );
  }

  if (error) {
    return <SignIn userData={userData} error={error} />;
  } else if (isLoading) {
    showLoader();
  } else {
    hideLoader();
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {/* Mobile-optimized layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User info section */}
          <div className="card p-4">
            <UserInfo userData={userData} />
          </div>

          {/* League info section - stacked on mobile, side-by-side on larger screens */}
          <div className="card p-4 md:col-span-2">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">League Information</h3>
              {leagueData && <ActiveLeagueInfo league={leagueData} />}
            </div>

            {/* Teams table - scrollable on mobile */}
            <div className="overflow-x-auto">
              <LeagueTable teams={leagueTeams} />
            </div>
          </div>

          {/* Draft controls - full width on mobile */}
          <div className="card p-4 md:col-span-3">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Draft Controls</h3>
              <DraftControls
                userData={userData}
                leagueData={leagueData}
                isPracticeLeague={isPracticeLeague}
                isLeagueFull={isLeagueFull}
                showDraftPickTips={showDraftPickTips}
                selectedDriver={selectedDriver}
                lastPickTime={lastPickTime}
                lastDriverPicked={lastDriverPicked}
                currentPickNumber={currentPickNumber}
                isUsersTurnToPick={isUsersTurnToPick}
                nextUserToPick={nextUserToPick}
                togglePracticeOptions={togglePracticeOptions}
                togglePracticeLeague={togglePracticeLeague}
                addTestTeam={addTestTeam}
                handlePick={handlePick}
              />
            </div>

            {/* Drivers table - scrollable on mobile */}
            <div className="overflow-x-auto mt-6">
              <h3 className="text-xl font-bold mb-2">Drivers</h3>
              <DriverTable
                isDraftInProgress={isDraftInProgress}
                isUsersTurnToPick={isUsersTurnToPick}
                selectedDriver={selectedDriver}
                undraftedDrivers={undraftedDrivers}
                handleDriverSelection={handleDriverSelection}
              />
            </div>
          </div>

          {/* Draft tips - always at the bottom */}
          <div className="card p-4 md:col-span-3">
            <DraftPickTips />
          </div>
        </div>
      </div>
    );
  }
}
