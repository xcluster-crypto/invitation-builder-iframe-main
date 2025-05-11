import { InvitationBuilder } from "@/components/invitation-builder"
import { InvitationPreview } from "@/components/invitation-preview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"

export default function BuilderPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">Wedding Invitation Builder</h1>
          <p className="text-gray-600">Create beautiful, customizable wedding invitations</p>
          <p className="text-gray-600">Toko Rambutan - Digital Computer</p>
          <p className="text-gray-600">Puri Remaja Asri</p>
        </header>

        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="builder">Builder</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="bg-white rounded-lg shadow-lg p-6">
            <InvitationBuilder />
          </TabsContent>

          <TabsContent value="preview" className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-end mb-4">
              <Button id="download-btn" className="flex items-center gap-2 mr-2 hidden">
                <Download size={16} />
                Download HTML
              </Button>
              <button
                id="download-zip-btn"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                //onClick={handleZipDownload}
              >
                Download Zip
              </button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <InvitationPreview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
