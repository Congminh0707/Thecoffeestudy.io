import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'PipeMoney',
})
export class PipeMoney implements PipeTransform {
    transform(input: string): string {
        if (input != '') {
            if (input.toString().indexOf('000') != -1) {
                input = input.toString().slice(0, -3);
                if (Number.parseInt(input.toString().slice(-1)) == 0) {
                    return input.toString().replace('0', '$&.000')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 1) {
                    return input.toString().replace('1', '$&.000')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 2) {
                    return input.toString().replace('2', '$&.000')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 3) {
                    return input.toString().replace('3', '$&.000')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 4) {
                    return input.toString().replace('4', '$&.000')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 5) {
                    return input.toString().replace('5', '$&.000')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 6) {
                    return input.toString().replace('6', '$&.000')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 7) {
                    return input.toString().replace('7', '$&.000')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 8) {
                    return input.toString().replace('8', '$&.000')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 9) {
                    return input.toString().replace('9', '$&.000')
                }
            }
            input = input.toString().slice(0, -2);
                if (Number.parseInt(input.toString().slice(-1)) == 1) {
                    return input.toString().replace('1', '.100')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 2) {
                    return input.toString().replace('2', '.200')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 3) {
                    return input.toString().replace('3', '.300')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 4) {
                    return input.toString().replace('4', '.400')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 5) {
                    return input.toString().replace('5', '.500')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 6) {
                    return input.toString().replace('6', '.600')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 7) {
                    return input.toString().replace('7', '.700')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 8) {
                    return input.toString().replace('8', '.800')
                }
                if (Number.parseInt(input.toString().slice(-1)) == 9) {
                    return input.toString().replace('9', '.900')
                }
        }
        return input
    }
}
