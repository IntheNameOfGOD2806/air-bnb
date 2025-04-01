const handleClickOutside = (event: React.MouseEvent, id: string, ref: React.RefObject<HTMLElement>, callback: () => void) => {

    if ((event.target as HTMLElement)?.id === id) {
        return
    }
    else {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
        }
    }
}
export {handleClickOutside}