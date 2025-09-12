import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router";
import { ChevronsLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BASE_API = import.meta.env.VITE_BASE_API

const formSchema = z.object({
  name: z.string().min(1, { error: "nama kategori wajib diisi" }),
  description: z.string().min(1, { error: "Keterangan wajib diisi" }),
})

export function CategoryAddPage() {
  const [newId, setNewId] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      const apiUrl = `${BASE_API}/api/category`

      const res = await api.post(apiUrl, {
        id: newId,
        ...values
      })

      console.log('resss', res)
      toast.success('Data berhasil disimpan')
      generateId()
    } catch (error) {
      toast.error('Data gagal disimpan')
      console.error(error)
    }
  }

  const generateId = async () => {
    try {
      const apiUrl = `${BASE_API}/api/category/last-id`
      const { data: resData } = await api.get(apiUrl)

      setNewId(++resData.data.id)
    } catch (error) {
      toast.error('Gagal generate id')
      console.error(error)
    }
  }

  useEffect(() => {
    generateId()
  }, [])

  return (
    <>
      <AppBreadcrumb items={[{ label: 'Kategori Surat', url: 'categories' }, { label: 'Tambah' }]} />
      <p className="mb-7 mt-1">
        Tambahkan data kategori. Jika sudah selesai, jangan lupa untuk <br />
        mengeklik tombol "Simpan"
      </p>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-2">
              <Label>ID (Auto Increment)</Label>
              <Input
                disabled
                value={newId}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kategori</FormLabel>
                  <FormControl>
                    <Input className="xl:w-4/12 lg:w-6/12 md:w-7/12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keterangan</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <Button asChild>
                <Link to="/categories">
                  <ChevronsLeft />
                  Kembali
                </Link>
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
