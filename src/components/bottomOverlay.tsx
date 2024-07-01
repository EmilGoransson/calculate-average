import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SideBar(props){
    return <div
        className="max-w-md rounded-lg p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 ">
        <Alert className=" text-left mx-auto">

            <AlertTitle>Snitt: </AlertTitle>
            <AlertTitle>Totalt HP som räknas:</AlertTitle>


        </Alert></div>
}