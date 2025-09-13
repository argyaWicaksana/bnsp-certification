import { AppBreadcrumb } from "@/components/app-breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { type Archive } from "../types";
import { formatDate } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, Download } from "lucide-react";
import api from "@/lib/api";

const BASE_API = import.meta.env.VITE_BASE_API

const formSchema = z.object({
  file: z
    .instanceof(File, { message: "File wajib diisi" })
    .refine((f) => f.type === "application/pdf", { message: "File harus PDF" }),
})

export function ArchiveViewPage() {
  const { archiveId } = useParams()
  const [archive, setArchive] = useState<Archive>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const apiUrl = `${BASE_API}/api/document-archive/${archiveId}`

      const fd = new FormData();
      fd.append("file", values.file);
      const res = await api.put(apiUrl, fd)

      console.log('res', res)
      toast.success('File berhasil diperbarui')

      fetchArchive()
    } catch (error) {
      toast.error('File gagal diperbarui')
      console.error(error)
    }
  }

  const handleDownload = async (filePath: string) => {
    if (!filePath) {
      return
    }

    const response = await api.get(`${BASE_API}/${filePath}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", 'document.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchArchive = async () => {
    try {
      const apiUrl = `${BASE_API}/api/document-archive/${archiveId}`
      const { data: resData } = await api.get(apiUrl)

      setArchive(resData.data)
    } catch (error) {
      toast.error('Gagal memuat data arsip surat')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchArchive()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AppBreadcrumb items={[{ label: 'Arsip Surat', url: 'archives' }, { label: 'Lihat' }]} />
      <div className="mb-7 mt-1">
        <ul>
          <li>Nomor: {archive?.letterNo}</li>
          <li>Kategori: {archive?.category?.name}</li>
          <li>Judul: {archive?.title}</li>
          <li>Waktu Unggah: {formatDate(archive?.createdAt ?? '')}</li>
        </ul>
      </div>

      <div className="mb-7">
        {
          archive ?
            <embed src={`${BASE_API}/${archive?.file}`} type="application/pdf" className="w-full h-[600px]" />
            : ''
        }
      </div>

      <div className="flex gap-3">
        <Button asChild>
          <Link to="/archives">
            <ChevronsLeft />
            Kembali
          </Link>
        </Button>

        <Button className="cursor-pointer" onClick={() => handleDownload(archive?.file ?? '')}>
          <Download />
          Unduh
        </Button>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-7">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <div className="flex">
                  <FormItem>
                    <FormControl>
                      <Input
                        className="sm:w-[200px] rounded-r-none"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => field.onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <Button className="rounded-l-none cursor-pointer" type="submit">Edit/Ganti File</Button>
                </div>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  )
}