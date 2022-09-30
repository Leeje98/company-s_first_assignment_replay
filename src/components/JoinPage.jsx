import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  width: 90%;
  height: auto;
  padding: 20px;
  /* margin: 0 auto; */
  @media screen and (min-width:1025px) {
      width: 570px;
    }
`

const Title = styled.h1`
  text-align: center;
  margin-top: 0;
  margin-bottom: 50px;
  @media screen and (min-width:1025px) {
  }
`

const InputBox = styled.div`
  width: 100%;
  height: 60px;
  padding: 35px 0;
  box-sizing: border-box;
  /* border: 1px solid #333; */
`

const InputInnerBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  /* border: 1px solid #333; */
`

const Name = styled.p`
  width: 150px;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  margin: 0;
  /* background-color: #ccc; */
`

const Input = styled.input`
  overflow: hidden;
  width: calc(100% - 100px);
  height: 40px;
  /* padding: 5px 39px 5px 11px; */
  border: solid 1px #333;
  background: #fff;
  box-sizing: border-box;
`;

const Guide = styled.label`
  font-size: 12px;
  text-align: end;
  width: 100%;
  height: 20px;
  margin: none;
  position: absolute;
  bottom: -2px;
  color: gray;
`

const TextBox = styled.textarea`
  width: 99%;
  height: 80px;
  margin: 0 auto;
  display: block;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #333;
`

const ButtonBox = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`

const Button = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #3f8aec;
  @media screen and (min-width:1025px) {
      width: 190px;
    }
`;






export default function JoinPage() {
  const [ userId, setUserId ] = useState('')
  const [ password, setPassowrod ] = useState('')
  const [ passwordCK, setPassowrodCK ] = useState('')
  const IDInputEl = useRef(null)
  const PWInputEl = useRef(null)
  const PWchInputEl = useRef(null)
  const IDInputElLabel = useRef(null)
  const PWInputElLabel = useRef(null)

  const ID = 'bpns1234'
  // 임의로 등록한 회원 ID - ID 중복테스트에 적용

  const handleChangeId = (event) => {
    IDInputElLabel.current.style = "display:block;"
    setUserId(event.target.value);
  }  // ID 입력 반영


  const handleChangePw = (event) => {
    PWInputElLabel.current.style = "display:block;"
    setPassowrod(event.target.value);
  } // 비밀번호 입력 반영


  const handleChangePwCK = (event) => {
    if ( password === '') {
      alert('비밀번호를 먼저 설정해주세요')
      setPassowrod('');
      PWInputEl.current.focus()
    } else {
    setPassowrodCK(event.target.value);
    }
  } // 비밀번호 확인란 입력 반영



  const IdCheck = /(?=.*\d)(?=.*[a-z]).{8,}/gi;
    // 적어도 알파벳 하나, 숫자 하나가 포함되어 있는 문자열(8글자 이상)

  const PwCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;
    //최소 8자리, 숫자,문자,특수문자 최소 1개


  const joinBtnClick = () => {
    if ( userId === '' || password === '' || passwordCK === '') {
      alert('양식을 모두 입력해주세요') 
    } else if( userId === ID ) {
      alert('이미 등록된 아이디입니다')
      setUserId('');
      IDInputEl.current.focus()
      return;
    } else if (!IdCheck.test(IDInputEl.current.value)) {
      alert('아이디는 숫자+영어 조합, 8자 이상으로 설정해주세요')
      setUserId('');
      IDInputEl.current.focus()
      return; // ID 설정 조건 검토 : 숫자, 영어 조합 / 대소문자 구분하지 않음 / 동일 아이디 가입 불가 /8글자 이상
    } else if(!PwCheck.test(PWInputEl.current.value)) {
      alert('패스워드는 숫자+영어+특수문자 조합, 8자 이상으로 설정해주세요')
      setPassowrod('');
      PWInputEl.current.focus() 
      return; // 비밀번호 입력란 조건 검토
    } else if ( password !== passwordCK ) {
      alert('비밀번호를 다시 확인해주세요')
      setPassowrodCK('')
      PWchInputEl.current.focus()  
      return; // 비밀번호 확인 일치 확인
    } else {
      alert('가입을 환영합니다!!')
      window.open('/main', '_self')
    }
  } // 회원가입 버튼 클릭시 조건 확인

  return (
    <Wrap>
    <Container>
      <Title>회원가입</Title>
      <InputBox>
        <InputInnerBox>
          <Name>아이디</Name>
            <Input id='id' name='id' ref={IDInputEl}  
                // placeholder='대소문자 구분없이 숫자+영어 조합으로 8자 이상 설정해주세요'
                type='text' value={userId} onChange={handleChangeId} />
            <Guide htmlFor='id' ref={IDInputElLabel} >숫자+영어 조합으로 8자 이상 설정해주세요</Guide>
        </InputInnerBox>
      </InputBox>
      
      <InputBox>
        <InputInnerBox>
          <Name>패스워드</Name> 
          <Input id='password' name='passoword' ref={PWInputEl} 
                  // placeholder='숫자+영어+특수문자 조합으로 8자 이상 설정해주세요'
                  type='password' value={password} onChange={handleChangePw} />
          <Guide htmlFor='id' ref={PWInputElLabel} >숫자+영어+특수문자 조합으로 8자 이상 설정해주세요</Guide>
        </InputInnerBox>
      </InputBox>
      <InputBox>
        <InputInnerBox>
          <Name>패스워드확인</Name> 
          <Input id='passowordCheck' name='passowordCheck' ref={PWchInputEl}
                  type='password' value={passwordCK} onChange={handleChangePwCK} />
        </InputInnerBox>
      </InputBox>


      <Name style={{ marginTop: '40px' }}>소개</Name>
      <TextBox placeholder='간단한 소개를 입력해주세요(선택)'></TextBox>
      
      <ButtonBox>
        <Button style={{ flex: 1, marginRight: '20px' }} onClick={joinBtnClick}>회원가입</Button>
        <Link to='/' style={{ textDecoration: 'none', flex: 1 }}>
          <Button style={{ width: '100%' }}>뒤로가기</Button>
        </Link>
      </ButtonBox>
    
    </Container>
    </Wrap>
  )
}
