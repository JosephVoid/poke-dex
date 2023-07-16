import { Pagination } from "react-bootstrap"

interface IPagination {
  totalPages: number,
  currentPage: number,
  onPageChange: (pageChangedTo: number) => void
}

export default function ControlledPages (props: IPagination) {
  let pagesDisplay = [props.currentPage, props.currentPage -1, 
  props.currentPage -2, props.currentPage + 1, props.currentPage +2]
  .sort((a, b) => a - b)

  return (
    <Pagination size='sm'>
      <Pagination.First onClick={() => props.onPageChange(1)} />
      <Pagination.Prev onClick={() => props.currentPage > 1 ? props.onPageChange(props.currentPage - 1) : null}/>
      <Pagination.Item onClick={() => props.onPageChange(1)}>{1}</Pagination.Item>
      {
        props.currentPage > 5 ? <Pagination.Ellipsis /> : null
      }
      {
        pagesDisplay.map((pD, index) => (
          <>
            {
              pD > 1 && pD < props.totalPages 
              ? <Pagination.Item key={index} onClick={() => props.onPageChange(pD)}>{pD}</Pagination.Item> 
              : null
            }
          </>
        ))
      }
      {
        props.currentPage < props.totalPages - 5 ? <Pagination.Ellipsis /> : null
      }
    
      <Pagination.Next onClick={() => props.currentPage < props.totalPages ? props.onPageChange(props.currentPage + 1) : null}/>
      <Pagination.Last onClick={() => props.onPageChange(props.totalPages)} />
    </Pagination>
  )
}