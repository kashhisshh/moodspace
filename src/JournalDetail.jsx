import { useEffect, useState } from "react"
import { useParams } from "react-router"
import DOMPurify from "dompurify";
import "../styles/journalDetail.css"
import useAuthStore from "./stores/authStore";
export default function JournalDetail(){
    const [entry, setEntry] = useState(null);
    const {id} = useParams()
    const token = useAuthStore((store)=>store.token);
    console.log(id);
    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/journal/${id}`, {
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            const data = await response.json();
            setEntry(data.journal)
        }
        fetchData();
    },[])
    return (
        <div className="journal-entry">
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry) }} />
        </div>
    )
}