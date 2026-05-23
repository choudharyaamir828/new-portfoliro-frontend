import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, Terminal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Input from '../../components/ui/Input'
import NeonButton from '../../components/ui/NeonButton'
import TextArea from '../../components/ui/TextArea'
import { useContactMutation } from '../../lib/hooks/useContactMutation'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Enter a valid email address.'),
  subject: z.string().min(3, 'Subject must be at least 3 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

const formatError = (error: unknown) => {
  if (!error) {
    return ''
  }

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'Transmission failed. Please try again.'
}

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [canSendAgain, setCanSendAgain] = useState(false)
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: '',
      message: '',
      name: '',
      subject: '',
    },
  })

  const mutation = useContactMutation({
    onSuccess: () => {
      reset()
      setSubmitted(true)
      setCanSendAgain(false)
    },
  })

  useEffect(() => {
    if (!submitted) {
      return undefined
    }

    const timeout = window.setTimeout(() => setCanSendAgain(true), 5_000)
    return () => window.clearTimeout(timeout)
  }, [submitted])

  const onSubmit = (values: ContactFormValues) => mutation.mutate(values)

  if (submitted) {
    return (
      <motion.div
        className="grid min-h-[28rem] place-items-center text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <Terminal className="mx-auto mb-5 h-12 w-12 text-neon-lime" />
          <h2 className="font-display text-4xl font-bold uppercase text-neon-lime text-glow">
            Message Transmitted
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text-secondary">
            Your signal landed successfully. I will get back to you from the other side of the API.
          </p>
          {canSendAgain ? (
            <NeonButton
              className="mt-8"
              variant="ghost"
              onClick={() => {
                setSubmitted(false)
                mutation.reset()
              }}
            >
              Send Another
            </NeonButton>
          ) : null}
        </div>
      </motion.div>
    )
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <AnimatePresence>
        {mutation.isError ? (
          <motion.div
            className="rounded-md border border-neon-magenta bg-neon-magenta/10 px-4 py-3 font-mono text-xs text-neon-magenta"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {formatError(mutation.error)}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" error={errors.name?.message} {...register('name')} />
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
      </div>
      <Input label="Subject" error={errors.subject?.message} {...register('subject')} />
      <TextArea label="Message" error={errors.message?.message} {...register('message')} />
      <NeonButton
        type="submit"
        className="w-full"
        isLoading={mutation.isPending}
        rightIcon={<Send className="h-4 w-4" />}
      >
        Transmit
      </NeonButton>
    </form>
  )
}

export default ContactForm
