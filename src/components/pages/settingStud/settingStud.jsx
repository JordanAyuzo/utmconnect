import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavbarAdmin from "@/components/layouts/navbar/navbarAdmin";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import NavbarStud from "@/components/layouts/navbar/navbarStud";

function SettingStud() {
    return (
        <div>
            <NavbarAdmin />
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                            <h1 className="">Mi perfil </h1>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                                href="#">Biografía</Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >Curriculum</Link>
                            <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                            >Security</Link>
                            <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#">Appearance</Link>
                        </nav>
                    </div>
                </div>
            </div>

            <div>
            <Dialog>
                <DialogTrigger></DialogTrigger>INformacion del Administrador
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col">
                <main className="flex-1 p-6">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold">Account</h1>
                            <p className="text-gray-500 dark:text-gray-400">Update your account information.</p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 items-start gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input defaultValue="John Doe" id="name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input defaultValue="john@example.com" id="email" type="email" />
                                </div>
                                </div>
                                <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea defaultValue="This is my bio." id="bio" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
        </div>
    );
}

export default SettingStud;
