import usePageProps from '~/components/ui/hook/use_flash_props'

export default function useError(id: string | undefined): string | undefined {
  const props = usePageProps<{ errors?: Record<string, string> }>()

  if (!props.errors) {
    return undefined
  }

  if (!id) {
    return undefined
  }

  if (!props.errors[id]) {
    return undefined
  }

  return props.errors[id]
}
