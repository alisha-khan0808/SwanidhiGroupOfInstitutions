'use client'
import { Briefcase, GraduationCap, Handshake, FlaskConical } from 'lucide-react'
import { DEMO_LOGIN_ENABLED, DEMO_PASSWORD } from '@/lib/demo'

export type DemoRole = 'admin' | 'associate' | 'student'

const ROLES: { role: DemoRole; label: string; desc: string; icon: typeof Briefcase; color: string }[] = [
  { role: 'admin', label: 'Office Staff', desc: 'Admin CRM', icon: Briefcase, color: 'text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100' },
  { role: 'student', label: 'Student', desc: 'Student portal', icon: GraduationCap, color: 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100' },
  { role: 'associate', label: 'Associate', desc: 'Partner portal', icon: Handshake, color: 'text-teal-700 bg-teal-50 border-teal-200 hover:bg-teal-100' },
]

/**
 * "Demo login" buttons for testing. Hidden when NEXT_PUBLIC_DEMO_LOGIN=false.
 * `roles` limits which buttons show; `loadingRole` shows a spinner on the clicked one.
 */
export default function DemoLoginButtons({
  onSelect,
  roles = ['admin', 'student', 'associate'],
  loadingRole = null,
  disabled = false,
  labels = {},
}: {
  onSelect: (role: DemoRole) => void
  roles?: DemoRole[]
  loadingRole?: DemoRole | null
  disabled?: boolean
  /** Override button text per role, e.g. { admin: { label: 'Website Admin', desc: 'Content panel' } } */
  labels?: Partial<Record<DemoRole, { label: string; desc: string }>>
}) {
  if (!DEMO_LOGIN_ENABLED) return null
  const items = ROLES.filter((r) => roles.includes(r.role)).map((r) => ({ ...r, ...labels[r.role] }))

  return (
    <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/60 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
          <FlaskConical className="w-3.5 h-3.5" /> Demo login · testing only
        </p>
        <p className="text-[11px] text-amber-700">Password: <span className="font-mono font-semibold">{DEMO_PASSWORD}</span></p>
      </div>
      <div className={`grid gap-2 ${items.length === 1 ? 'grid-cols-1' : items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {items.map(({ role, label, desc, icon: Icon, color }) => (
          <button
            key={role}
            type="button"
            onClick={() => onSelect(role)}
            disabled={disabled}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${color}`}
          >
            {loadingRole === role ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icon className="w-4 h-4" />
            )}
            <span className="text-xs font-bold leading-tight">{label}</span>
            <span className="text-[10px] opacity-75 leading-tight">{desc}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
