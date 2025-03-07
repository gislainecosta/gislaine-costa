import ErrorIcon from "@mui/icons-material/Error";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import * as St from "../../pages/Home/styles";
import {
  IMachine,
  MachineTypes,
  NewMachine,
} from "../../redux/store/machines/types";
import { changeName } from "../../shared/utils";

interface IFormMachineProps {
  formHook: UseFormReturn<IMachine>;
  formSubmit: SubmitHandler<IMachine | NewMachine>;
}

export default function MachineForm({
  formHook,
  formSubmit,
}: IFormMachineProps) {
  const { formState, handleSubmit, getValues, setValue } = formHook;
  const errors = formState.errors;
  const [machineName, setMachineName] = useState<string>(() => {
    const values = getValues("name") || "";
    return values;
  });
  const [machineType, setMachineType] = useState<MachineTypes>(() => {
    const values = getValues("type") || MachineTypes.pump;
    return values;
  });

  useEffect(() => {
    setValue("name", machineName);
  }, [machineName, setValue]);

  useEffect(() => {
    setValue("type", machineType);
  }, [machineType, setValue]);

  return (
    <St.Form autoComplete="off" onSubmit={handleSubmit(formSubmit)}>
      <St.Input>
        <FormControl variant="standard">
          <InputLabel htmlFor="name">Nome da Máquina</InputLabel>
          <Input
            sx={{ width: "12rem" }}
            required
            value={machineName}
            type="text"
            error={!!errors.name}
            autoComplete="off"
            onChange={(e) => {
              setMachineName(changeName(e.target.value));
            }}
            name="name"
            id="name"
          />
        </FormControl>
        {errors.name && (
          <St.ErrorMessage>
            <ErrorIcon color="error" fontSize="small" />
            <p>{errors.name.message as string} </p>
          </St.ErrorMessage>
        )}
      </St.Input>
      <St.Input>
        <FormControl variant="standard">
          <InputLabel htmlFor="name">Tipo de Máquina</InputLabel>
          <Select
            sx={{ width: "12rem" }}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={machineType}
            onChange={(e) => setMachineType(e.target.value as MachineTypes)}
            label="Tipo de Máquina"
          >
            <MenuItem value={MachineTypes.pump}>Bomba</MenuItem>
            <MenuItem value={MachineTypes.fan}>Ventilador</MenuItem>
          </Select>
        </FormControl>
        {errors.type && (
          <St.ErrorMessage>
            <ErrorIcon color="error" fontSize="small" />
            <p>{errors.type.message as string} </p>
          </St.ErrorMessage>
        )}
      </St.Input>
      <Button type="submit">Salvar</Button>
    </St.Form>
  );
}
