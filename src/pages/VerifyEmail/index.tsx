import { Box, CircularProgress, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { routers } from "../../commons/routers";
import { verifyActive } from "../../commons/utils/userRequest";
import { Container, Label, WrapButton, WrapContent, WrapForm } from "./styles";


export default function VerifyEmail() {
  const history = useHistory();
  const path = useLocation();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const handleVerify = async (code: string) => {
    try {
      const response = await verifyActive({ code });
      setLoading(false);
      setSuccess(response.data.code === "SS_0");
    } catch (error) {
      setLoading(false);
      setSuccess(false);
    }
  }
  useEffect(() => {
    const params = new URLSearchParams(path.search);
    const code = params.get('code');
    if (code) {
      handleVerify(code);
    }
  }, [path.search])
  return (
    <Container>
      <WrapContent>
        <FormGroup>
          {
            loading ? (<WrapForm>
              <Box textAlign={'center'}>
                <CircularProgress sx={{
                  color: 'grey',
                }}/>
              </Box>
            </WrapForm>) :
              success ?
                (<WrapForm>
                  <Label mb={3}>
                    Success
                  </Label>
                  <WrapButton variant="contained" fullWidth onClick={() => history.push(routers.SIGN_IN)}>
                    Sign In
                  </WrapButton>
                </WrapForm>)
                : (
                  <WrapForm>
                    <Label>
                      Something went wrong
                    </Label>
                  </WrapForm>
                )}
        </FormGroup>
      </WrapContent>
    </Container >
  )
}
