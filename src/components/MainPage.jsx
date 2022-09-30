import React, { useRef, useState } from 'react'
import CreateUser from './CreateUser'
import UserList from './UserList'

export default function MainPage() {

  const [ newModal, setNewModal ] = useState(false)      // 신규 모달창 열고 닫기
  const [ inputs, setInputs ] = useState({               // 신규 모달창에 입력한 값 받아올 틀
    productID: '', 
    name: '',
    produce: '',
    registration: '',
    detail: '',
    manager: ''
  })
  const { productID, name, produce, registration, detail, manager } = inputs;        // inputs의 기본 값??**질문하기

  const onChange = e => {                               // 신규 모달창에 입력 이벤트가 있을때 폼안의 정보를 갱신하는 기능
    const { name, value } = e.target;                   // 이벤트가 일어나는 폼을 타겟으로 잡아 
    setInputs({                             
      ...inputs,                                        // 기존 inputs값 가져오기
      [ name ]: value                                   // name을 기준으로 잡고 그에 매칭되는 value값을 받아온다
    })
  }

  const [ users, setUsers ] = useState([                 
    {
      id: 1,
      productID: 'BPSOLUTION01',
      name: '제품명01',
      produce: '2022-09-01',
      registration: '2022-09-01',
      detail: "상세설명01 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quod!",
      manager: '홍길동'
    },
    {
      id: 2,
      productID: 'BPSOLUTION02',
      name: '제품명02',
      produce: '2022-09-02',
      registration: '2022-09-02',
      detail: '상세설명02 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed minima quisquam quia.',
      manager: '아인슈타인'
    },
    {
      id: 3,
      productID: 'BPSOLUTION03',
      name: '제품명03',
      produce: '2022-09-03',
      registration: '2022-09-03',
      detail: '상세설명03 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, quis corrupti.',
      manager: '엘렌워커'
    },
    {
      id: 4,
      productID: 'BPSOLUTION04',
      name: '제품명04',
      produce: '2022-09-04',
      registration: '2022-09-04',
      detail: '상세설명04 Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi.',
      manager: '윤동주'
    },
  ])


  const nextId = useRef(5);  // 새로 생성될 항목에 부여될 id값 : 폼에서 입력하는 항목이 아니기 때문에 따로 만들어줘야 함         

  const onClose = () => {
    setNewModal(false)
  }   // 신규 모달창 취소 버튼 클릭시 모달창 닫힘 기능

  const onCreate = () => {
      // 나중에 구현 할 배열에 항목 추가하는 로직

    const Date = /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/
    const IdCk = /^(?=.*?[A-Z])(?=.*?[0-9])(^[a-z]).{12,12}$/

    if((inputs.productID) === '' || (inputs.name) === '' ) {
      alert('제품ID와 제품명은 필수 입력입니다')
    } else if( !IdCk.test(inputs.productID)){
      alert('제품ID를 올바르게 입력해주세요 \n(숫자, 영어 대문자 조합 12자리)')
    } else if( !Date.test(inputs.produce) && (inputs.produce !== '') ) {
      alert('날짜를 형식에 맞게 입력해주세요')
    } else if( !Date.test(inputs.registration) && (inputs.registration !== '') ) {
      alert('등록일자를 형식에 맞게 입력해주세요')    // 등록 전 조건에 맞는 내용인지 확인
    } else{     // 조건에 맞는 내용이라면 등록하기
      const user = {         // user라는 변수로 모달창에 입력했던 각각의 value값 들고오기 // value={productID}
        id: nextId.current,                           
        productID, 
        name,
        produce,
        registration,
        detail,
        manager         
      }   
      setUsers([...users, user])       // 1. ...스프레드 연산자 사용 // [기존배열, 새로추가할 자식컴포넌트에서 들고온 배열요소]
      // setUsers(users.concat(user))  // 2. concat(추가명령어) 사용   // [기존배열, concat(새로추가할 자식컴포넌트에서 들고온 배열요소)]
                                       // 리스트 렌더링

      // setInputs({                      
      //   productID: '',
      //   name: '',
      //   produce: '',
      //   registration: '',
      //   detail: '',
      //   manager: ''
      // })                               // 위에서 정보저장 했으니 모달창 폼 리셋 시키기?? 
                                          // 일체형 아니고 모달형식으로, 열때마다 빈칸으로 시작하기때문에 필요없는 것으로 추정
                                          // 그럼 리셋은 어디서 되는거지??**

      nextId.current += 1;             // 다음 요소 생성시 사용될 아이디 +1 해놓기
      setNewModal(false)               
    }
  }

  
  const onRemove = (id) => {
    // 현재 삭제 버튼을 클릭한 리스트의 아이디값을 받아옴

    if(window.confirm('해당 내용을 삭제 하시겠습니까?')) {
    setUsers(users.filter(user => user.id !== id))
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함

    console.log(`ID:${id} 삭제완료`) 
    alert('삭제되었습니다')
    } else {
      console.log('삭제 요청 취소') 
    }
  }


  const onUpdate = ( id, data ) => {  // 기준값 id, 어떻게 바꿀지 = data
    setUsers(users.map(     // 1. 맵으로 전체를 돌리며 체크한다
      users => {          // 2. users 값을 파라미터로 가져와서
        if (users.id === id ) {   // 3. 만약 users가 가지고 있는 id값이 파라미터가 가지고 있는 id값이랑 일치한다
          return {
            id,              // id 는 id 그대로 쓰고(기준값)
            ...data,         // 여기에  productID, name, produce, ...등 각 요소의 값을 넣어준다
          }
        }
        return users;  // 조건이 트루가 아니라면(배열이 변한게 없다면) 그대로 리턴한다
      }
    ))
  }



  return (
    <div className='wrap'>

      { newModal === true ? 
        <CreateUser
          onClose={onClose} 
          onCreate={onCreate} 
          onChange={onChange}  
          //-- 자식 컴포넌트에게 속성 전달(상속)
        />
      : null }

      <div className='head'>
        <h1 className='userTitle'>제품 리스트 new!</h1>
        <button className='newBtn'
          onClick={()=>{setNewModal(true)}}
        >신규</button>
      </div> {/* header */}

      <section className='userOuter'>
      <div className='product_user'>
        <UserList 
          users={users} 
          onRemove={onRemove}
          onUpdate={onUpdate}
          // 전달 props명(자식컴포넌트에서 받아서 이용함) = {현재(부모)컴포넌트의 오브젝트 name}
          // 이벤트 종류 = {현재(부모)컴포넌트에서 선언한 함수명}
          //-- 자식 컴포넌트에게 속성 전달(상속)
        />
      </div>
      </section>
    </div>
  )
}
