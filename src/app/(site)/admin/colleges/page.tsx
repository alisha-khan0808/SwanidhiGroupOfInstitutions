'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import ContentManager, { type Field } from '@/components/admin/ContentManager'
import { departments } from '@/data/courses'

const fields: Field[] = [
  { name: 'name', label: 'College Name', type: 'text', required: true, wide: true, help: 'Shown on the All Colleges page and the department page, e.g. Swanidhi College of Nursing' },
  { name: 'slug', label: 'URL Slug', type: 'text', required: true, slugFrom: 'name', help: 'Auto-filled from the name. Lowercase words joined by hyphens.' },
  { name: 'short_name', label: 'Short Name', type: 'text', help: 'e.g. Swanidhi Nursing' },
  { name: 'department', label: 'Department (courses offered)', type: 'select', options: departments.map(d => d.slug), help: departments.map(d => `${d.slug} = ${d.name}`).join(' · ') },
  { name: 'location', label: 'Location', type: 'text', help: 'e.g. Patna, Bihar' },
  { name: 'badge', label: 'Badge', type: 'text', help: 'Small badge on the photo, e.g. Verified, Admissions Open, NAAC A' },
  { name: 'established', label: 'Established (year)', type: 'number', nullable: true },
  { name: 'sort_order', label: 'Sort Order', type: 'number', help: 'Lower numbers appear first' },
  { name: 'image', label: 'Campus Photo', type: 'image', help: 'Leave empty to use the department photo' },
  { name: 'logo', label: 'College Logo', type: 'image', help: 'Square logo. Leave empty to show the department icon' },
  { name: 'description', label: 'Description', type: 'textarea' },
]

export default function AdminCollegesPage() {
  return (
    <AdminLayout>
      <ContentManager
        table="colleges"
        title="Colleges"
        singular="College"
        fields={fields}
        columns={[
          { key: 'name', label: 'College' },
          { key: 'department', label: 'Department' },
          { key: 'location', label: 'Location' },
          { key: 'badge', label: 'Badge' },
        ]}
        searchKeys={['name', 'short_name', 'department', 'location']}
        orderBy={{ column: 'sort_order', ascending: true }}
        defaults={{
          name: '', slug: '', short_name: '', department: departments[0].slug, location: '', badge: 'Verified',
          established: null, sort_order: 999, image: '', logo: '', description: '',
        }}
        viewUrl={row => `/departments/${row.department}`}
      />
    </AdminLayout>
  )
}
