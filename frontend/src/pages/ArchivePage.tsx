import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoveRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { formatDate } from "@/lib/utils"
import { AppPagination } from "@/components/app-pagination"
import { toast } from "sonner"
import { AppBreadcrumb } from "@/components/app-breadcrumb"
import { Link } from "react-router";
import { type Archive } from "../types";
import api from "@/lib/api"

const BASE_API = import.meta.env.VITE_BASE_API

export function ArchivePage() {
  const [archives, setArchives] = useState<Archive[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')

  const fetchArchives = async () => {
    try {
      const apiUrl = `${BASE_API}/api/document-archive?page=${currentPage}&search=${search}`
      const { data } = await api.get(apiUrl)
      const totalItems = data.data.total

      setArchives(data.data.data)
      setTotalPages(Math.ceil(totalItems / 10))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Gagal memuat data')
      console.log(error)
    }
  }

  useEffect(() => {
    fetchArchives();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSearchKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      fetchArchives()
    }
  }

  const handleDownload = async (filePath: string) => {
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

  const handleDelete = async (archiveId: number) => {
    try {
      const apiUrl = `${BASE_API}/api/document-archive/${archiveId}`
      await api.delete(apiUrl)

      toast.success('Berhasil menghapus data')

      fetchArchives()
    } catch (error) {
      toast.error('Gagal menghapus data')
      console.log(error)
    }
  }

  return (
    <>
      <AppBreadcrumb items={[{ label: 'Arsip Surat' }]} />
      <div className="mb-7 mt-1">
        <p>
          Berikut ini adalah surat-surat yang telah terbit dan diarsipkan <br />
          Klik "Lihat" pada kolom aksi untuk menampilkan surat.
        </p>
      </div>

      <div className="flex gap-3 items-center mb-7">
        <p>Cari surat:</p>
        <div className="flex w-full max-w-sm items-center gap-2">
          <div className="relative w-full">
            <Input onChange={(e) => setSearch(e.target.value)} className="pl-9" onKeyUp={handleSearchKeyUp} placeholder="search..." />
            <Search className="absolute left-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button type="button" onClick={fetchArchives} variant="default">
            Cari
          </Button>
        </div>
      </div>

      <Table className="mb-6">
        <TableHeader>
          <TableRow>
            <TableHead>Nomor Surat</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Judul</TableHead>
            <TableHead>Waktu Pengarsipan</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            archives.map((archive, i) => (
              <TableRow key={i}>
                <TableCell>{archive.letterNo}</TableCell>
                <TableCell>{archive.category.name}</TableCell>
                <TableCell>{archive.title}</TableCell>
                <TableCell>{formatDate(archive.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-red-500 hover:bg-red-400">Hapus</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Alert</DialogTitle>
                          <DialogDescription>
                            Apakah anda yakin ingin menghapus arsip surat ini?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={() => handleDelete(archive.id)}>Ya</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button onClick={() => handleDownload(archive.file)} className="bg-yellow-500 hover:bg-yellow-400">Unduh</Button>
                    <Button asChild className="bg-blue-500 hover:bg-blue-400">
                      <Link to={`/archives/${archive.id}`}>
                        Lihat <MoveRight />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <AppPagination currentPage={currentPage} totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <div>
        <Button asChild variant="default">
          <Link to='/archives/create'>
            Arsipkan Surat
          </Link>
        </Button>
      </div>
    </>
  )
}
