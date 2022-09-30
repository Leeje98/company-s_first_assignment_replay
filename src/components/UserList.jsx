import React, { useState } from 'react'
import './Main.css'

export default function UserList({users, onRemove}) {           // ---{} 에 대해 질문하기** 객체를 아예 가져오는 것인가??
                            // 부모컴포넌트에서 const 로 선언했던 객체 정보 받아오기(props)

  const [showModal, setShowModal] = useState(false);           // 모달창이 보이고 안보이는 상태관리
  const [activeObject, setActiveObject] = useState(null);      // 모달창에 들어갈 리스트 내용 요소
                                                               // 기본으로는 모달창이 보이지 않기 때문에 아무것도 없는 null상태


  // 여기서 className은 Modal이 항상 activeObject를 표시하기 때문에 "inactive"(비활성)일 수 없습니다.
  const Modal = ({ object: { id, productID, name, produce, registration, detail, manager, onRemove }}) => {

    return (  // 모달창 표시 부분
      <div id="productModal" className="active">
      <div className='mobalBg'></div>
      <div className='CreateModal'>
        <div className='InnerModal'>
        <h2 className='NewTitle'>제품 정보</h2>
        <ul className='info_user'>
          <>                                     {/* 수정모드가 아니라면 value값 부분 기본 div표시 */}
            <div className='InputBox'>
              <div className='Title'>제품ID : </div>
              <div className='inputstyle'>{productID}</div>
            </div>
            <div className='InputBox'>
              <div className='Title'>제품명 : </div>
              <div className='inputstyle'>{name}</div>
            </div>
            <div className='InputBox'>
              <div className='Title'>제조일자 : </div>
              <div className='inputstyle'>{produce}</div>
            </div>
            <div className='InputBox'>
              <div className='Title'>등록일자 : </div>
              <div className='inputstyle'>{registration}</div>
            </div>
            <div className='InputBox'>
              <div className='Title'>상세설명 : </div>
              <div className='inputstyle Textarea'>{detail}</div>
            </div>
            <div className='InputBox'>
              <div className='Title'>등록자 : </div>
              <div className='inputstyle'>{manager}</div>
            </div>
          </>
          
          
        </ul>
        <button className='Button editingBtn'>수정</button>

        <button className='Button' onClick={() => {
          console.log('삭제 요청');
          onRemove(id)
          setShowModal(false)
          console.log('모달 닫힘') // 부모 컴포넌트에서 관리 방법 질문하기** 삭제요청 취소시 안 닫힐 수 있도록
        }}>삭제</button> 

        <button className='Button' style={{ right:0 }} 
          onClick={() => {
            setShowModal(false); 
            console.log(`ID:${id} 모달 닫힘`)
        }}>확인</button>
        </div>
      </div>
    </div>
    )
  }


  return (
    <>
      <div className='list-menu'>
        {users.map(({ id, productID, name, produce, registration, detail, manager }) => (
                      // map으로 돌려 표시할 리스트 내용에 관한 정보와 모달창표시에 필요한 users에 관한 속성값 부모컴포넌트로부터 상속 받기
          <li 
            key={id}
            onClick={() => {
              console.log(`ID:${id} 모달 열림`)
              setActiveObject({ id, productID, name, produce, registration, detail, manager, onRemove, // onChange, onUpdate 
              });
                              // 모달창에 들어갈 리스트에 포함된 내용&이벤트 요소 : 원래값 null 이다가 오픈할때 내용 속성값들 받아옴
              setShowModal(true);                                
            }}
          >
            <ul className='info_user'>
              <li>
                <div className='Title'>제품ID : </div>
                <div className='inputstyle'>{productID}</div>
              </li>
              <li>
                <div className='Title'>제품명 : </div>
                <div className='inputstyle'>{name}</div>
              </li>
              <li>
                <div className='Title'>제조일자 : </div>
                <div className='inputstyle'>{produce}</div>
              </li>
              <li>
                <div className='Title'>등록일자 : </div>
                <div className='inputstyle'>{registration}</div>
              </li>
              {/* 리스트에 노출되는 항목들로, 상세설명과 등록자 제외 */}
            </ul>
          </li>
        ))}
      </div>
      {showModal ? <Modal object={activeObject} /> : null}
      {/* 모달창 표시 부분 : 상태관리를 통해 노출 결정 */}
    </>
  )
}
