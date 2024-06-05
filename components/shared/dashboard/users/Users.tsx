import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import RenderTablePage from "./table/facility/RenderTable";
import {
    Card,
} from "@/components/ui/card"


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";


import UsersForm from "./form/UsersForm";
import RenderTableUsers from "./table/users/RenderTable";
export default function UsersPage() {
    return (
        <div className="py-2">
            <header className="bg-white ">
                <div className="flex items-center justify-end p-3">
                    <div className="flex items-center space-x-2">
                        <Dialog>
                            <DialogTrigger>
                                <Button variant={"colorCompany"} className="text-xs">
                                    Thêm mới người dùng
                                </Button>
                            </DialogTrigger>
                         

                            <DialogContent className="min-w-[50%]">
                                <DialogTitle className="text-2xl text-primary-backgroudPrimary">Thêm mới người dùng</DialogTitle>
                                <Separator className="h-1" />
                                <UsersForm />
                            </DialogContent>
                        </Dialog>
                        <Button variant={"outline"}> <EllipsisVertical size={20} /></Button>
                    </div>
                </div>
            </header>

            <Card className="my-2">
             <RenderTableUsers />
            </Card>
        </div>
    );
}