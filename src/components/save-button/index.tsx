import Button from '@components/button'
import { ComponentProps } from 'react'

type SaveButtonProps = ComponentProps<'button'> & {
  hasChanged?: boolean
}

const SaveButton = ({ hasChanged, ...props }: SaveButtonProps) => {
  return (
    <section className="flex flex-row gap-4 items-center" {...props}>
      {hasChanged && (
        <p className="text-red-700 text-xs font-semibold max-w-[90px] animate-pulse">Perubahan belum disimpan...</p>
      )}
      <Button className="!bg-green-700 !px-4">Simpan</Button>
    </section>
  )
}

export default SaveButton
