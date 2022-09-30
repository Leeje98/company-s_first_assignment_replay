import React, { useState } from 'react'
import './Main.css'

export default function UserList({ users, onRemove, onUpdate }) {   
                            // 부모컴포넌트에서 const 로 선언했던 객체 정보 받아오기(props)

  const [showModal, setShowModal] = useState(false);           // 모달창이 보이고 안보이는 상태관리
  const [activeObject, setActiveObject] = useState(null);      // 모달창에 들어갈 리스트 내용 요소
                                                               // 기본으로는 모달창이 보이지 않기 때문에 아무것도 없는 null상태

  const [editingMode, setEditingMode] = useState(false)        // 수정모드에 진입했는지 여부 (수정버튼 클릭 시)
  const [ editingInputs, setEditingInputs ] = useState(users, {       // 수정값 반영 요소들 // 수정 상태 입력 폼
    productID: '',                                   
    name: '',
    produce: '',
    registration: '',
    detail: '',
    manager: ''
  })

  const { name, produce, registration, detail, manager } = editingInputs;      // set으로만 이용되고 초기값은 사용되는 곳이 없어서 불이 꺼짐 


  // 여기서 className은 Modal이 항상 activeObject를 표시하기 때문에 "inactive"(비활성)일 수 없습니다.
  const Modal = ({ object: { id, productID, name, produce, registration, detail, manager, onRemove }, onAccept }) => {
                  // 모달창에 들어갈 리스트 내용 요소                                              // 수정버튼 클릭 이벤트
                     // 이런 형식은 처음 보는데..?**

    const [ editing, setEditing ] = useState({     // 기존값 들고 와서 수정 시 값이 바뀌는걸 반영해줌 
      id: id,       // 기준값            
      productID: productID,
      name: name,
      produce: produce,
      registration: registration,
      detail: detail,
      manager: manager
    })

    const _handleChange = (e) => {
      const {name, value} = e.target
      setEditing(pre => {
        return {
          ...pre,
          [ name ]: value
        }
      })
    }    

    return (  // 모달창 표시 부분
      <div id="productModal" className="active">
      <div className='mobalBg'></div>
      <div className='CreateModal'>
        <div className='InnerModal'>
        <h2 className='NewTitle'>제품 정보</h2>
        <ul className='info_user'>
        {
            editingMode ? (           // 수정 모드인가?
              <>                      {/* 수정모드라면 value값들이 input상태  */}
              <div className='InputBox'>          
                <div className='Title'>제품ID : </div>
                <div className='inputstyle'>{productID}</div>
              </div>
              <div className='InputBox'>
                <div className='Title'>제품명 : </div>        
                <div className='inputstyle'>
                  <input
                    name='name' 
                    onChange={_handleChange}
                    value={editing.name}
                  />
                  </div>
              </div>
              <div className='InputBox'>
                <div className='Title'>제조일자 : </div>
                <div className='inputstyle'>
                  <input
                    name='produce' 
                    onChange={_handleChange}
                    placeholder='yyyy-mm-dd'
                    value={editing.produce}
                  />
                  </div>
              </div>
              <div className='InputBox'>
                <div className='Title'>등록일자 : </div>
                <div className='inputstyle'>
                  <input
                    name='registration' 
                    onChange={_handleChange}
                    placeholder='yyyy-mm-dd'
                    value={editing.registration}
                  />
                  </div>
              </div>
              <div className='InputBox'>
                <div className='Title'>상세설명 : </div>
                <div className='inputstyle Textarea'>
                  <textarea
                    name='detail' 
                    onChange={_handleChange}
                    value={editing.detail}
                  />
                  </div>
              </div>
              <div className='InputBox'>
                <div className='Title'>등록자 : </div>
                <div className='inputstyle'>
                  <input
                    name='manager' 
                    onChange={_handleChange}
                    value={editing.manager}
                  />
                  </div>
              </div>
              </>
            ) : (
              <>                                     {/* 수정모드가 아니라면 value값 부분 div표시 */}
              <div className='InputBox'>
                <div className='Title'>제품ID : </div>
                <div className='inputstyle'>{productID}</div>
              </div>
              <div className='InputBox'>
                <div className='Title'>제품명 : </div>
                <div className='inputstyle'>{editing.name}</div>
              </div>
              <div className='InputBox'>
                <div className='Title'>제조일자 : </div>
                <div className='inputstyle'>{editing.produce}</div>
              </div>
              <div className='InputBox'>
                <div className='Title'>등록일자 : </div>
                <div className='inputstyle'>{editing.registration}</div>
              </div>
              <div className='InputBox'>
                <div className='Title'>상세설명 : </div>
                <div className='inputstyle Textarea'>{editing.detail}</div>
              </div>
              <div className='InputBox'>
                <div className='Title'>등록자 : </div>
                <div className='inputstyle'>{editing.manager}</div>
              </div>
              </>
            )
          }
        </ul>                                                       {/* // editing: 수정된 내용 요소 */}
        <button className='Button editingBtn' onClick={(e) => {onAccept(e, editing)}}>
         { editingMode ? '적용' : '수정' }              {/* // onAccept:수정 버튼 클릭 이벤트 */}
        </button>

        { editingMode ? null :
        <button className='Button' onClick={() => {
          console.log('삭제 요청');
          onRemove(id)
          setShowModal(false)
          console.log('모달 닫힘') // 부모 컴포넌트에서 관리 방법 질문하기** 삭제요청 취소시 안 닫힐 수 있도록
        }}>삭제</button> }

        { editingMode ? 
        <button className='Button' style={{ right:0 }} 
        onClick={() => {setEditingMode(false)}}
        >취소</button>
         : 
        <button className='Button' style={{ right:0 }} 
          onClick={() => {
            setShowModal(false); 
            setEditingMode(false);
            console.log(`ID:${id} 모달 닫힘`);
        }}>확인</button> }
        </div>
      </div>
    </div>
    )
  }



  function handleToggleEdit(event, data) {                     // 수정모드 진입여부를 컨트롤 (수정버튼 클릭 시)  
    
    if (editingMode) {     // 수정모드에서 저장 시

      const Date = /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/

      if((data.name) === '' ) {
        alert('제품명은 필수 입력입니다')
      } else if( !Date.test(data.produce) && (data.produce !== '') ) {
        alert('날짜를 형식에 맞게 입력해주세요')
      } else if( !Date.test(data.registration) && (data.registration !== '') ) {
        alert('날짜를 형식에 맞게 입력해주세요')
      } else {
        onUpdate(data.id, { 
          productID: data.productID,
          name: data.name,
          produce: data.produce,
          registration: data.registration,
          detail: data.detail,
          manager: data.manager
        })
        setActiveObject(pre => ({ 
          ...pre,                     // 일단 전체 내용을 다 불러오고**        
          productID: data.productID,  // 그 중에 바뀐 값을 업데이트 한다
          name: data.name,
          produce: data.produce,
          registration: data.registration,
          detail: data.detail,
          manager: data.manager
        }))                            // 모달창의 값을 업데이트
        alert('수정되었습니다') 
        setEditingMode(!editingMode)        
      }
    } else {                // 보기모드에서 수정모드 집입 시
      setEditingInputs({      
        productID: data.productID,                                   
        name: data.name,
        produce: data.produce,
        registration: data.registration,
        detail: data.detail,
        manager: data.manager
      })
      setEditingMode(!editingMode)        
    }
    
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
              setActiveObject({ id, productID, name, produce, registration, detail, manager, onRemove, onUpdate // onChange,  
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

                                                {/* // 수정버튼 클릭 이벤트 */}
      {showModal ? <Modal object={activeObject} onAccept={handleToggleEdit} /> : null} {/* 모달창 표시 부분 : 상태관리를 통해 노출 결정 */}
                          {/* // 모달창에 들어갈 리스트 내용 요소 */}
    </>
  )
}
