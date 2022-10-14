import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';

const Form = () => {
  const [details, setDetails] = useState({
    payer: '',
    payerAccount: '',
    sum: '',
    receiver: '',
    receiverAccount: '',
    payerType: '',
  });
  const handleSubmit = e => {
    e.preventDefault();
    console.log(details);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack gap="10" padding="5" shadow="dark-lg" borderRadius="lg">
        <FormControl>
          <FormLabel htmlFor="payer">Platitor:</FormLabel>
          <Input
            required={true}
            size="md"
            variant="flushed"
            name="payer"
            id="payer"
            onChange={e => {
              setDetails({ ...details, payer: e.target.value });
            }}
            value={details.payer}
          />
          <FormLabel htmlFor="payerAccount">Cont Platitor:</FormLabel>
          <Input
            required={true}
            size="md"
            variant="flushed"
            name="payerAccount"
            id="payerAccount"
            onChange={e => {
              setDetails({ ...details, payerAccount: e.target.value });
            }}
            value={details.payerAccount}
          />
          <FormLabel htmlFor="sum">Suma:</FormLabel>
          <Input
            required={true}
            size="md"
            variant="flushed"
            type="number"
            name="sum"
            id="sum"
            onChange={e => {
              setDetails({ ...details, sum: e.target.value });
            }}
            value={details.sum}
          />
          <FormLabel htmlFor="receiver">Beneficiar:</FormLabel>
          <Input
            required={true}
            size="md"
            variant="flushed"
            name="receiver"
            id="receiver"
            onChange={e => {
              setDetails({ ...details, receiver: e.target.value });
            }}
            value={details.receiver}
          />
          <FormLabel htmlFor="receiverAccount">Cont Beneficiar:</FormLabel>
          <Input
            required={true}
            size="md"
            variant="flushed"
            name="receiverAccount"
            id="receiverAccount"
            onChange={e => {
              setDetails({ ...details, receiverAccount: e.target.value });
            }}
            value={details.receiverAcount}
          />
          <Select
            mt="10"
            onChange={e =>
              setDetails({ ...details, payerType: e.target.value })
            }
            placeholder="Alegeti Ocupatia"
          >
            <option value="student">Student</option>
            <option value="employee">Angajat</option>
            <option value="retired">Pensionar</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
        <Button colorScheme="teal" type="submit">
          Submit
        </Button>
      </VStack>
    </form>
  );
};
export default Form;
