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
      <DialogContent className="max-w-xl w-[90%] rounded-xl p-0 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="overflow-y-auto p-0">
          <ComposeForm onSent={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
