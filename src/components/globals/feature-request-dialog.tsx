import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
type FeatureRequestDialogProps = {
  trigger: ReactNode
}

const schema = z.object({
  title: z.string().min(1, 'this field is required'),
  description: z.string().min(1, 'this field is required'),
  email: z.string().email('should be a valid email!'),
})

type Schema = z.infer<typeof schema>
function FeatureRequestDialog({ trigger }: FeatureRequestDialogProps) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      email: '',
    },
  })

  const onSubmit: SubmitHandler<Schema> = (data) => {
    console.log({ data })
    //TODO: feature request
  }

  return (
    <Dialog>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feature Request</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Request for features by filling up this form.
        </DialogDescription>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-2'
        >
          <Controller
            control={form.control}
            name='title'
            render={({ field, fieldState: { error } }) => {
              return (
                <div className='flex flex-col gap-2'>
                  <Label>Title</Label>
                  <Input {...field} />
                  {error?.message && (
                    <span className='text-xs text-red-400'>
                      {error.message}
                    </span>
                  )}
                </div>
              )
            }}
          />
          <Controller
            control={form.control}
            name='description'
            render={({ field, fieldState: { error } }) => {
              return (
                <div className='flex flex-col gap-2'>
                  <Label>Description</Label>
                  <Textarea {...field} className=' resize-none' />
                  {error?.message && (
                    <span className='text-xs text-red-400'>
                      {error.message}
                    </span>
                  )}
                </div>
              )
            }}
          />
          <Controller
            control={form.control}
            name='email'
            render={({ field, fieldState: { error } }) => {
              return (
                <div className='flex flex-col gap-2'>
                  <Label>Email*</Label>
                  <Input {...field} type='email' />
                  {error?.message && (
                    <span className='text-xs text-red-400'>
                      {error.message}
                    </span>
                  )}
                </div>
              )
            }}
          />
          <Button type='submit' variant={'ghost'}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FeatureRequestDialog
