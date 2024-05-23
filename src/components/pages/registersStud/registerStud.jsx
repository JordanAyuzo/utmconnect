import React from 'react';
import NavbarAdmin from '@/components/layouts/navbarAdmin/navbarAdmin';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import "./registerStud.css";

function RegisterStud() {
    return (
        <div>
            <NavbarAdmin />
            <div className="flex justify-center items-center min-h-screen bg-teal-50">
                <Card className="w-full max-w-md mx-auto ring-gray-300 ring-1 ring-opacity-20 shadow-xl ">
                    <CardContent className="p-6 space-y-2">
                        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
                            <span className="text-sm font-medium text-gray-500">Drag and drop a file or click to browse</span>
                            <span className="text-xs text-gray-500">PDF, image, video, or audio</span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <Label className="text-sm font-medium" htmlFor="file">File</Label>
                            <Input accept="image/*" id="file" placeholder="File" type="file" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg">Upload</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default RegisterStud;
