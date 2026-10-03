'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import ContentManager, { type Field } from '@/components/admin/ContentManager'
import { departments, levels } from '@/data/courses'

const fields: Field[] = [
  { name: 'name', label: 'Course Name (short)', type: 'text', required: true, help: 'As printed in the fee structure, e.g. B.Sc. Nursing' },
  { name: 'slug', label: 'URL Slug', type: 'text', required: true, slugFrom: 'name', help: 'Auto-filled from the name. Lowercase words joined by hyphens.' },
  { name: 'full_name', label: 'Full Course Name', type: 'text', required: true, wide: true, help: 'e.g. Bachelor of Science in Nursing' },
  { name: 'department', label: 'Department', type: 'select', options: departments.map(d => d.slug), help: departments.map(d => `${d.slug} = ${d.name}`).join(' · ') },
  { name: 'level', label: 'Level', type: 'select', options: levels },
  { name: 'duration', label: 'Duration (display text)', type: 'text', required: true, help: 'e.g. 4 Years & 6 Month Internship' },
  { name: 'duration_years', label: 'Duration in Years (number)', type: 'number', step: '0.5', help: 'Used for the duration filter, e.g. 4.5' },
  { name: 'eligibility', label: 'Eligibility', type: 'text', required: true, wide: true, help: 'e.g. 10+2 with Biology' },
  { name: 'yearly_fees', label: 'Year-wise Fees (₹)', type: 'numlist', required: true, help: 'One amount per year, separated by commas — e.g. 75000, 75000, 75000, 75000' },
  { name: 'total_fee', label: 'Total Course Fee (₹)', type: 'number', required: true },
  { name: 'fee_note', label: 'Fee Note', type: 'text', help: 'Optional, e.g. 5th Year: ₹60,000' },
  { name: 'sort_order', label: 'Sort Order', type: 'number', help: 'Lower numbers appear first' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'highlights', label: 'Programme Highlights', type: 'list' },
  { name: 'careers', label: 'Career Opportunities', type: 'list' },
  { name: 'featured', label: 'Show in "Popular Courses" on homepage', type: 'checkbox' },
]

export default function AdminCoursesPage() {
  return (
    <AdminLayout>
      <ContentManager
        table="programs"
        title="Courses"
        singular="Course"
        fields={fields}
        columns={[
          { key: 'name', label: 'Course' },
          { key: 'department', label: 'Department' },
          { key: 'duration', label: 'Duration' },
          { key: 'yearly_fees', label: 'Year-wise Fees' },
          { key: 'total_fee', label: 'Total Fee' },
        ]}
        searchKeys={['name', 'full_name', 'department', 'eligibility']}
        orderBy={{ column: 'sort_order', ascending: true }}
        defaults={{
          name: '', slug: '', full_name: '', department: departments[0].slug, level: 'Degree',
          duration: '', duration_years: 3, eligibility: '', yearly_fees: [], total_fee: 0, fee_note: '',
          sort_order: 999, image: '', description: '', highlights: [], careers: [], featured: false,
        }}
        viewUrl={row => `/courses/${row.slug}`}
      />
    </AdminLayout>
  )
}
