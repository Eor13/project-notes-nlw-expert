import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState("")

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }
  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value === "") {
      setShouldShowOnboarding(true)
    }
  }
  function hanldeSalveNote(event: FormEvent) {
    event.preventDefault()
    if(content === "") return

    onNoteCreated(content)

    setContent("")

    setShouldShowOnboarding(true)

    toast.success("Nota criada com Sucesso!")
  }
  function handleStartRecording() {
    
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    
    if(!isSpeechRecognitionAPIAvailable){
      alert("Infelizmente seu navegador não suporta a API de gravação!")
      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = "pt-BR"
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transciption = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      },"")

      setContent(transciption)
    }

    speechRecognition.onerror = (event) => {
      console.log(event)
    }

    speechRecognition.start()
  }
  function handleStopRecording() {
    setIsRecording(false)

    if(speechRecognition !== null){
      speechRecognition.stop()
    }
  }


  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 gap-3 text-left  p-5 hover:ring-2 outline-none hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">Grave uma nota em áudio que será convertida para texto automaticamente.</p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:top-1/2 md:left-1/2 w-full md:max-w-[640px] md:h-[60vh] bg-slate-700 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col outline-none md:rounded-md'>
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 text-slate-400 p-1.5 hover:text-slate-100'>
            <X className='size-5' />
          </Dialog.Close>
          <form className=' flex flex-1 flex-col'>
            <div className="flex flex-1 flex-col  gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece <button type='button' onClick={handleStartRecording} className='font-medium text-lime-400 hover:underline'>gravando uma nota em áudio </button> ou se preferir <button type='button' onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>.
                </p>
              ) : (
                <textarea autoFocus className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' onChange={handleContentChanged} value={content} />
              )}
              <div className="absolute bottom-0 right-0 left-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/60 to-black/0" />
            </div>
            {isRecording ? (
              <button type='button' onClick={handleStopRecording} 
              className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-slate-300 text-sm outline-none font-medium hover:text-slate-100'>
                <div className='size-3 rounded-full bg-red-500 animate-pulse'/>
                Gravando! (Clique para interromper)
              </button>
            ) : (
              <button type='button' onClick={hanldeSalveNote} className='w-full bg-lime-400 py-4 text-center text-lime-950 text-sm outline-none font-medium hover:bg-lime-500'>
                Salvar Nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { NewNoteCard }