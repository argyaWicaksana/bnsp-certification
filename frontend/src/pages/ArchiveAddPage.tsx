import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

const BASE_API = import.meta.env.VITE_BASE_API

const formSchema = z.object({
  letterNo: z.string().min(1, { error: "Nomor surat wajib diisi" }),
  categoryId: z.number().int().positive({ error: "Kategori wajib diisi" }),
  title: z.string().min(1, { error: "Judul wajib diisi" }),
  file: z
    .instanceof(File, { message: "File wajib diisi" })
    .refine((f) => f.type === "application/pdf", { message: "File harus PDF" }),
})

export function ArchiveAddPage() {
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      letterNo: "",
      categoryId: 0,
      title: "",
      file: undefined
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      const apiUrl = `${BASE_API}/api/document-archive`

      const fd = new FormData();
      fd.append("letterNo", values.letterNo);
      fd.append("categoryId", values.categoryId.toString());
      fd.append("title", values.title);
      fd.append("file", values.file);
      const res = await api.post(apiUrl, fd)

      console.log('resss', res)
      toast.success('Data berhasil disimpan')
    } catch (error) {
      toast.error('Data gagal disimpan')
      console.error(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const apiUrl = `${BASE_API}/api/category`
      const { data } = await api.get(apiUrl)

      setCategories(data.data.data)
    } catch (error) {
      toast.error('Gagal memuat data kategori surat')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <>
      <AppBreadcrumb items={[{ label: 'Arsip Surat', url: 'archives' }, { label: 'Unggah' }]} />
      <p className="mb-7 mt-1">
        Unggah surat yang telah terbit pada form ini untuk diarsipkan <br />
        Catatan: Gunakan file berformat pdf
      </p>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="letterNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Surat</FormLabel>
                  <FormControl>
                    <Input className="xl:w-4/12 lg:w-6/12 md:w-7/12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <Select onValueChange={(val) => field.onChange(+val)}
                      value={field.value.toString()} defaultValue={field.value.toString()}>
                      <SelectTrigger className="xl:w-4/12 lg:w-6/12 md:w-7/12">
                        <SelectValue placeholder="Kategori Surat" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          categories.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input className="md:w-10/12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FIle Surat (PDF)</FormLabel>
                  <FormControl>
                    <Input
                      className="sm: w-[350px]"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => field.onChange(e.target.files?.[0])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <Button asChild>
                <Link to="/archives">
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