import { AppBreadcrumb } from "@/components/app-breadcrumb"

export function AboutPage() {
  return (
    <>
      <div className="mb-7">
        <AppBreadcrumb items={[{ label: 'About' }]} />
      </div>
      <div className="flex justify-start gap-5 w-fit rounded-xl shadow-sm py-6 ps-6 pe-20 border">
        <div>
          <img src="/photoProfile.png" alt="Image" className="rounded-md object-cover h-[200px]" />
        </div>
        <div>
          Aplikasi ini dibuat oleh:
          <table>
            <tbody>
              <tr>
                <td>Nama</td>
                <td>: Argya Wicaksana</td>
              </tr>
              <tr>
                <td>Prodi</td>
                <td>: D4-TI</td>
              </tr>
              <tr>
                <td>NIM</td>
                <td>: 2141720134</td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td>: 12 September 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}