"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignInSchema } from "@/schema";
import { useAuth } from "@/hooks/useAuth";
import { authApi } from "@/apis/auth.api";
import { useRouter } from 'next/navigation'

import {handlerLogin,login} from "@/app/api/sign-in/routes";
import axios from "axios";
export default function FormSignIn() {
    const auth = useAuth();
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState<boolean>(true);

    // ** Hooks
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            id: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        const{id, password} = data
        setLoading(true);
        login(data);
        console.log(data)
    };


    return (
        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-md w-full flex flex-col gap-4"
              
            >
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center text-secondary-backgroudPrimary">
                                CCCD/CMND
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center text-secondary-backgroudPrimary">
                                NHẬP MẬT KHẨU
                            </FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormLabel className="flex items-center text-secondary-backgroudPrimary"></FormLabel>
                <Button
                    type="submit"
                    className="w-full bg-secondary-backgroudPrimary text-primary-backgroudPrimary hover:bg-yellow-300"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "ĐĂNG NHẬP"}
                </Button>
            </form>
        </Form>
    );
}
