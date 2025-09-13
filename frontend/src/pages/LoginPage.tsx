import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import api from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

const BASE_API = import.meta.env.VITE_BASE_API

const formSchema = z.object({
    username: z.string().min(1, { error: "Username wajib diisi" }),
    password: z.string().min(1, { error: "Password wajib diisi" }),
})

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const { login, getToken } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const token = getToken()
        if (token) {
            navigate('/archives')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const apiUrl = `${BASE_API}/api/auth/login`

            const { data: resData } = await api.post(apiUrl, values)

            login(resData.data.token, resData.data.user)
            navigate('/archives')
        } catch (error) {
            toast.error('Gagal login')
            console.error(error)
        }
    }

    return (
        <div className="flex justify-center mt-28">
            <Card className="w-full max-w-sm">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="flex justify-center">
                                <h1 className="text-2xl">Login</h1>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input autoComplete="username" {...field} />
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative w-full">
                                                <Input autoComplete="current-password" type={showPassword ? "text" : "password"} {...field} />
                                                {
                                                    showPassword ?
                                                        <EyeClosed onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
                                                        :
                                                        <Eye onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
                                                }
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full cursor-pointer mt-8">
                                Login
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}