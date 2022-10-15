import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { isValid } from 'iban';

const Form = () => {
  const [details, setDetails] = useState({
    payerName: 'Marian',
    payerIban: 'RO62BREL0005505440400100',
    sum: '22',
    receiverName: 'Marian2',
    receiverIban: 'RO62BREL0005505440400100',
    payerType: 'STUDENT',
  });
  const [error, setError] = useState('');
  const serverUrl = 'http://localhost:8080/';

  const sendRequest = details => {
    fetch(serverUrl + 'add', {
      method: 'post',
      body: JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          setError('');
          alert('Payment Order Sent!');
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(response => {
        generatePaymentOrder();
        console.log(response);
      })
      .catch(err => setError('Error!'));
  };

  const generatePaymentOrder = () => {
    // if (details.payerType === '') {
    //   setError('Alegeti ocupatia curenta!');
    //   return;
    // }
    // if (!isValid(details.payerIban) || !isValid(details.receiverIban)) {
    //   setError('IBAN invalid!');
    //   return;
    // }
    // if (!Number.isInteger(Number(details.sum))) {
    //   setError('Suma trebuie sa fie un numar intreg!');
    //   return;
    // }
    const textString =
      'Platitor : ' +
      details.payerName +
      '\nCont Platitor: ' +
      details.payerIban +
      '\nSuma: ' +
      details.sum +
      '\nBeneficiar: ' +
      details.receiverName +
      '\nCont Beneficiar: ' +
      details.receiverIban;
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(textString)
    );
    element.setAttribute('download', 'Ordin_de_plata.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (details.payerType === '') {
      setError('Alegeti ocupatia curenta!');
      return;
    }
    if (!isValid(details.payerIban) || !isValid(details.receiverIban)) {
      setError('IBAN invalid!');
      return;
    }
    if (!Number.isInteger(Number(details.sum))) {
      setError('Suma trebuie sa fie un numar intreg!');
      return;
    }
    sendRequest(details);
  };
  const calculateDiscount = () => {
    switch (details.payerType) {
      case 'EMPLOYEE':
        return '20%';
      case 'STUDENT':
        return '30%';
      case 'RETIRED':
        return '25%';
      default:
        return '0%';
    }
  };
  const getXmlStringFromDetails = () => {
    return `<paymentOrder>
            <payerName>${details.payerName}</payerName>
            <payerIban>${details.payerIban}</payerIban>
            <payerType>${details.payerType}</payerType>
            <sum>${details.sum}</sum>
            <receiverName>${details.receiverName}</receiverName>
            <receiverIban>${details.receiverIban}</receiverIban>
        </paymentOrder>`;
  };
  // TODO:: SEND XML FILE TO DB
  return (
    <form onSubmit={handleSubmit}>
      <VStack padding="5" shadow="dark-lg" borderRadius="lg">
        {error != '' && <Text color="red.500">{error}</Text>}
        <FormControl>
          <FormLabel htmlFor="payerName">Platitor:</FormLabel>
          <Input
            required={true}
            size="md"
            variant="flushed"
            name="payerName"
            id="payerName"
            onChange={e => {
              setDetails({ ...details, payerName: e.target.value });
            }}
            value={details.payerName}
          />
          <FormLabel htmlFor="payerIban">Cont Platitor:</FormLabel>
          <Input
            required={true}
            size="md"
            variant="flushed"
            name="payerIban"
            id="payerIban"
            onChange={e => {
              setDetails({ ...details, payerIban: e.target.value });
            }}
            value={details.payerIban}
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
          <FormLabel htmlFor="receiverName">Beneficiar:</FormLabel>
          <Input
            required={true}
            size="md"
            variant="flushed"
            name="receiverName"
            id="receiverName"
            onChange={e => {
              setDetails({ ...details, receiverName: e.target.value });
            }}
            value={details.receiverName}
          />
          <FormLabel htmlFor="receiverIban">Cont Beneficiar:</FormLabel>
          <Input
            required={true}
            size="md"
            variant="flushed"
            name="receiverIban"
            id="receiverIban"
            onChange={e => {
              setDetails({ ...details, receiverIban: e.target.value });
            }}
            value={details.receiverIban}
          />
          <Select
            my="5"
            onChange={e =>
              setDetails({ ...details, payerType: e.target.value })
            }
            value={details.payerType}
            placeholder="Ocupatia Curenta:"
          >
            <option value="STUDENT">Student</option>
            <option value="EMPLOYEE">Angajat</option>
            <option value="RETIRED">Pensionar</option>
            <option value="OTHER">Other</option>
          </Select>
          {details.payerType !== '' && (
            <Text>Discount : {calculateDiscount()}</Text>
          )}
        </FormControl>
        <Button colorScheme="teal" type="submit">
          Submit
        </Button>
      </VStack>
    </form>
  );
};
export default Form;
