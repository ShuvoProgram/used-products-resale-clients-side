import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Go Travel`;
    }, [title])
}

export default useTitle;