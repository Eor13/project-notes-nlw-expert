import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';

interface NoteCardProp {
    note: {
        id: string,
        date: Date,
        content: string
    }
    onNoteDeleted: (id:string) => void
}

function NotesCard({ note, onNoteDeleted }: NoteCardProp) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 gap-3 outline-none p-5 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                
                <span className="text-sm font-medium text-slate-300">
                    {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    {note.content}
                </p>
                <div className="absolute bottom-0 right-0 left-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/60 to-black/0" />
            </Dialog.Trigger>
            
            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50' />
                <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:top-1/2 md:left-1/2 w-full md:max-w-[640px] md:h-[60vh] bg-slate-700 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col outline-none md:rounded-md'>
                    <Dialog.Close className='absolute right-0 top-0 bg-slate-800 text-slate-400 p-1.5 hover:text-slate-100'>
                        <X className='size-5' />
                    </Dialog.Close>

                    <div className="flex flex-1 flex-col  gap-3 p-5">
                        <span className="text-sm font-medium text-slate-300">
                            {formatDistanceToNow(note.date)}
                        </span>
                        <p className="text-sm leading-6 text-slate-400">
                            {note.content}
                        </p>
                        <div className="absolute bottom-0 right-0 left-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/60 to-black/0" />
                    </div>

                    <button type='button' onClick={() => onNoteDeleted(note.id)} className='w-full bg-slate-800 py-4 text-center text-slate-300 text-sm outline-none font-medium group'>
                        Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?
                    </button>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export { NotesCard }