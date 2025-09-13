import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
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
import { AppPagination } from "@/components/app-pagination"
import { toast } from "sonner"
import { AppBreadcrumb } from "@/components/app-breadcrumb"
import { Link } from "react-router";
import { type Category } from "../types";
import api from "@/lib/api"

const BASE_API = import.meta.env.VITE_BASE_API

export function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')

  const fetchCategories = async () => {
    try {
      const apiUrl = `${BASE_API}/api/category?page=${currentPage}&search=${search}`
      const { data } = await api.get(apiUrl)
      const totalItems = data.data.total

      setCategories(data.data.data)
      setTotalPages(Math.ceil(totalItems / 10))
    } catch (error) {
      toast.error('Gagal memuat data')
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSearchKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      fetchCategories()
    }
  }

  const handleDelete = async (categoryId: number) => {
    try {
      const apiUrl = `${BASE_API}/api/category/${categoryId}`
      await api.delete(apiUrl)

      toast.success('Berhasil menghapus data')

      fetchCategories()
    } catch (error) {
      toast.error('Gagal menghapus data')
      console.log(error)
    }
  }

  return (
    <>
      <AppBreadcrumb items={[{ label: 'Kategori Surat' }]} />
      <div className="mb-7 mt-1">
        <p>
          Berikut ini adalah kategori yang bisa digunakan untuk melabeli surat. <br />
          Klik "Tambah" pada kolom aksi untuk menambahkan kategori baru.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 items-center mb-7">
        <p>Cari kategori:</p>
        <div className="flex w-full max-w-sm items-center gap-2">
          <div className="relative w-full">
            <Input onChange={(e) => setSearch(e.target.value)} className="pl-9" onKeyUp={handleSearchKeyUp} placeholder="search..." />
            <Search className="absolute left-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button type="button" onClick={fetchCategories} variant="default">
            Cari
          </Button>
        </div>
      </div>

      <Table className="mb-6">
        <TableHeader>
          <TableRow>
            <TableHead>ID Kategori</TableHead>
            <TableHead>Nama Kategori</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            categories.map((category, i) => (
              <TableRow key={i}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
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
                            Apakah anda yakin ingin menghapus kategori surat ini?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={() => handleDelete(category.id)}>Ya</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button asChild className="bg-blue-500 hover:bg-blue-400">
                      <Link to={`/categories/${category.id}`}>
                        Edit
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

      <div className="mb-7">
        <Button asChild variant="default">
          <Link to='/categories/create'>
            <Plus />
            Tambah Kategori Baru
          </Link>
        </Button>
      </div>
    </>
  )
}

