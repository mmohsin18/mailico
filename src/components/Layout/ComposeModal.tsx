import { Dialog, DialogContent } from '@/components/ui/dialog'
import ComposeForm from './ComposeForm'

export default function ComposeModal({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0">
        <ComposeForm onSent={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
