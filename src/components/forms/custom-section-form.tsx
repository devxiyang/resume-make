"use client"

import { useResume } from "@/context/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useResumeForm, validateCustomSection } from "@/hooks/use-resume-form"
import { CustomSection } from "@/lib/types"
import { EditingSpinner } from "@/components/editing-spinner"

export function CustomSectionForm() {
  const { resumeData, selectedIds, addItem, deleteItem, addCustomSectionItem } = useResume()
  const selectedSection = resumeData.customSections.find(section => section.id === selectedIds.customSection)

  const form = useResumeForm<CustomSection>({
    type: 'customSection',
    initialValues: selectedSection || {
      id: '',
      title: '',
      items: [],
    },
    validate: validateCustomSection,
  })

  const handleAddItem = () => {
    const newItems = [...(form.values.items || []), { title: '', description: '' }]
    form.handleChange('items', newItems)
  }

  const handleRemoveItem = (index: number) => {
    const newItems = (form.values.items || []).filter((_, i) => i !== index)
    form.handleChange('items', newItems)
  }

  const handleItemChange = (index: number, field: 'title' | 'description', value: string) => {
    const newItems = [...(form.values.items || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    form.handleChange('items', newItems)
  }

  if (!selectedSection) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 mb-4">Select a custom section to edit</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Edit Custom Section</CardTitle>
          <EditingSpinner />
        </div>
      </CardHeader>
      <CardContent>
        {selectedSection.items.length === 0 ? (
          <>
            <p className="text-gray-500 mb-4">No items in this section</p>
            <Button onClick={() => addCustomSectionItem(selectedSection.id)}>
              Add Item
            </Button>
          </>
        ) : (
          <p className="text-gray-500">Select an item to edit</p>
        )}
      </CardContent>
    </Card>
  )
}

export function CustomSectionItemForm() {
  const { resumeData, selectedIds, updateItem } = useResume()
  const selectedSection = resumeData.customSections.find(section => section.id === selectedIds.customSection)
  const selectedItem = selectedSection?.items.find(item => item.id === selectedIds.customSectionItem)

  const form = useResumeForm<CustomSection>({
    type: 'customSection',
    initialValues: selectedSection || {
      id: '',
      title: '',
      items: [],
    },
    validate: validateCustomSection,
  })

  if (!selectedSection || !selectedItem) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 mb-4">No item selected</p>
      </div>
    )
  }

  const handleItemChange = (field: 'title' | 'description', value: string) => {
    const updatedItems = selectedSection.items.map(item =>
      item.id === selectedItem.id
        ? { ...item, [field]: value }
        : item
    );

    const updatedSection = {
      ...selectedSection,
      items: updatedItems
    };

    updateItem('customSection', updatedSection);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Edit Item</CardTitle>
          <EditingSpinner />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={selectedItem.title}
              onChange={(e) => handleItemChange('title', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={selectedItem.description}
              onChange={(e) => handleItemChange('description', e.target.value)}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 