import Layout from "../../components/layout"
import ImageManager from "../../components/image-manager"

export default function AdminPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-white mb-4">Admin Panel</h1>
          <p className="text-xl text-gray-400">Manage your DEC Tech backend</p>
        </div>

        <ImageManager />
      </div>
    </Layout>
  )
}
