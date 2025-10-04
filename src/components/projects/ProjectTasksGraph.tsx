"use client";

import { JSX, useEffect } from "react";
import StorageIcon from '@mui/icons-material/Storage';
import LaptopIcon from '@mui/icons-material/Laptop';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LanguageIcon from '@mui/icons-material/Language';
import { PieChart, Pie, Cell } from "recharts";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";

interface TaskData {
  id: string;
  title: string;
  desc: string;
  type: string;
  done: boolean;
  projectId: string;
}

interface ProjectTasksGraphProps {
  idProject: string;
  taskType: string;
}

export default function ProjectTasksGraph({ idProject, taskType }: ProjectTasksGraphProps): JSX.Element {

    const { data, loading, isSuccess, isError, request: getTasks } = useApi<TaskData[]>();
    const skeletonLoader = useSkeletonLoader("100px", "100%");

    useEffect(() => {
        getTasks(`/api/projects/${idProject}/tasks?taskType=${taskType}`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPieChartData = () => {
        if (data) {
            return [
                { name: "Fait", value: data.filter((task) => task.done).length},
                { name: "Reste", value: data.filter((task) => !task.done).length}
            ]
        }
        return []
    }

    const getIconFromTaskType = () => {
        const style = "text-gray-800 w-5 h-5";

        switch (taskType) {
            case "Front-end":
                return <LaptopIcon className={style} />;
            case "Back-end":
                return <StorageIcon className={style} />;
            case "Documentation":
                return <HelpCenterIcon className={style} />;
            case "Deploiement":
                return <LanguageIcon className={style} />;
            default:
                return <>{taskType}</>;
        }
    }

    return (
        <div className="flex flex-col gap-2 bg-white shadow-sm rounded-lg p-3 border border-gray-200 w-53 flex-wrap whitespace-nowrap">
            {loading && skeletonLoader()}
            {!loading && isError && 
                <p className="text-gray-800">Erreur lors du chargement des tâches {taskType}</p>
            }
            {!loading && isSuccess && data && data.length === 0 &&
                <div className="flex items-center justify-between flex-row gap-4">
                    <div className="flex items-center gap-2">
                        {getIconFromTaskType()}
                        <p className="font-medium text-gray-800">{taskType}</p>
                    </div>
                    <p className="text-gray-600 text-sm">
                        0 / 0
                    </p>
                </div>
            }
            {!loading && isSuccess && data && data.length > 0 &&
                <>
                    <div className="flex items-center justify-between flex-row gap-4">
                        <div className="flex items-center gap-2">
                            {getIconFromTaskType()}
                            <p className="font-medium text-gray-800">{taskType}</p>
                        </div>
                        <p className="text-gray-600 text-sm">
                            {data.filter((task) => task.done).length} / {data.length}
                        </p>
                    </div>
                    <PieChart width={120} height={120}>
                      <Pie
                        data={getPieChartData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={55}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="blue" />
                        <Cell fill="red" />
                      </Pie>
                    </PieChart>
                </>
            }
        </div>
    )
}