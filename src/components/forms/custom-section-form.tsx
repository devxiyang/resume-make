"use client"

import { useResume } from "@/context/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useResumeForm, validateCustomSection } from "@/hooks/use-resume-form"
import { CustomSection } from "@/lib/types"

export function CustomSectionForm() {
  const { resumeData, selectedIds, addItem, deleteItem } = useResume()
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
        <p className="text-gray-500 mb-4">No custom section selected</p>
        <Button onClick={() => addItem('customSection')}>Add Custom Section</Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Custom Section</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => addItem('customSection')}>
            Add New
          </Button>
          <Button variant="destructive" onClick={() => deleteItem('customSection', selectedSection.id)}>
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={form.values.title}
              onChange={(e) => form.handleChange('title', e.target.value)}
              onBlur={() => form.handleBlur('title')}
            />
            {form.touched.title && form.errors.title && (
              <p className="text-sm text-red-500">{form.errors.title}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Items</Label>
              <Button type="button" variant="outline" onClick={handleAddItem}>
                Add Item
              </Button>
            </div>
            {(form.values.items || []).map((item, index) => (
              <div key={index} className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <Label>Item {index + 1}</Label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </Button>
                </div>
                <Input
                  value={item.title}
                  onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                  placeholder="Item title"
                />
                <Input
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="Item description"
                />
              </div>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export function CustomSectionItemForm() {
  const { resumeData, selectedIds, addCustomSectionItem, deleteCustomSectionItem, updateItem } = useResume()
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
        <Button onClick={() => selectedSection && addCustomSectionItem(selectedSection.id)}>
          Add Item
        </Button>
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Item</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => addCustomSectionItem(selectedSection.id)}>
            Add New
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => deleteCustomSectionItem(selectedSection.id, selectedItem.id)}
          >
            Delete
          </Button>
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