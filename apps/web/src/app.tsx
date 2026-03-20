import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Spinner } from "./components/ui/spinner"
import { IoLogoGithub } from "react-icons/io"
import { useForm } from "react-hook-form"
import { useState } from "react"

type FormData = {
  url: string
}

export function App() {
  const { register, handleSubmit, watch, reset } = useForm<FormData>()
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const useFormWatchUrl = watch('url')

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const r = await (
      await fetch(`${import.meta.env.VITE_API_URL}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: data.url })
      })
    ).json()
    reset()
    setShortUrl(`${import.meta.env.VITE_API_URL}/${r.code}`)
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-[75vh]">
      <div className="flex items-center justify-between p-7">
        <a href="https://github.com/lleo0h" className="bg-black/0 transition-colors duration-500 p-2 rounded-sm hover:bg-neutral-200">
          <IoLogoGithub size={40} className="text-neutral-500" />
        </a>
      </div>
      <div className="flex flex-1 items-center justify-center px-4">
        <form className="flex flex-col gap-3 w-full max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold">ENCURTAR URL</h1>
          <Input {...register('url', { required: true, pattern: { value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/, message: 'Insira uma URL válida.' } })} className="w-full h-10 rounded-sm" placeholder="https://github.com/lleo0h" />
          <Button disabled={(!useFormWatchUrl || loading === true)} type="submit" className="w-full h-10 rounded-sm bg-neutral-500 font-bold">ENCURTAR</Button>
          <div className={`p-3 bg-gray-100 rounded-md flex items-center ${loading ? "justify-center" : "justify-between"}`}>
            {loading
              ? (<Spinner />)
              : (
                <>
                  <span className="text-sm truncate">{shortUrl}</span>
                  <button
                    type="button"
                    className="active:translate-y-px text-sm font-bold text-neutral-500"
                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                  >
                    Copiar
                  </button>
                </>
              )
            }
          </div>
        </form>
      </div>
    </div>
  )
}